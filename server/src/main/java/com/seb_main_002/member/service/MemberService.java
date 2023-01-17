package com.seb_main_002.member.service;

import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.security.jwt.JwtTokenizer;
import com.seb_main_002.security.util.CustomAuthorityUtils;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;

    @Transactional
    public void updateSubscribe(Long memberId, Boolean isSubScribed) {
        Member member = verifyMember(memberId);
        Subscribe subscribe = member.getSubscribe();

        if (subscribe.getIsSubscribed() != isSubScribed) {
            //구독 취소할 경우
            if (subscribe.getIsSubscribed() == true) {
                subscribe.setIsSubscribed(isSubScribed);
                subscribe.setSampleCount(0);
                subscribe.setReserveProfit(0);
                subscribe.setTotalDeliveryDiscount(0);
                subscribe.setSubscribedDate(null);
            } else {
                //구독 신청의 경우
                subscribe.setIsSubscribed(isSubScribed);
                Integer sampleCount = subscribe.getSampleCount();
                subscribe.setSampleCount(sampleCount + 10);
                subscribe.setSubscribedDate(LocalDateTime.now());
            }
            member.setSubscribe(subscribe);
            memberRepository.save(member);
        } else {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_SUBSCRIBE);
        }

    }

    public Member verifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }
    public void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
    }
    public void verifyExistsAccountId(String accountId) {
        Optional<Member> optionalMember = memberRepository.findByAccountId(accountId);
        if(optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNTID_EXISTS);
        }
    }

    public Member findMember(Long memberId) {
        return verifyMember(memberId);
    }
    @Transactional
    public void updateMember(Long memberId, Member member) {
        Member verifedMember = verifyMember(memberId);
        verifyExistsEmail(member.getEmail());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> verifedMember.setName(name));
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> verifedMember.setEmail(email));
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> verifedMember.setPhoneNumber(phoneNumber));
        Optional.ofNullable(member.getTagList())
                .ifPresent(tagList -> verifedMember.setTagList(tagList));

        memberRepository.save(verifedMember);
    }
    @Transactional
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsAccountId(member.getAccountId());
        //암호 인코딩 후 저장
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        //role 생성 후 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        // 구독 생성 후 저장
        Subscribe subscribe = new Subscribe();
        subscribe.setIsSubscribed(false);
        subscribe.setSampleCount(0);
        member.setSubscribe(subscribe);
        //카트 생성 후 저장
        Cart cart = new Cart();
        member.setCart(cart);
        memberRepository.save(member);
        return member;
    }
    @Transactional
    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("accountId", member.getAccountId());
        claims.put("roles",member.getRoles());
        String subject = member.getAccountId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }
}
