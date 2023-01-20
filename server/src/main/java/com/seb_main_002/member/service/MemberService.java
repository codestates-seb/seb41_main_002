package com.seb_main_002.member.service;

import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.security.jwt.JwtTokenizer;
import com.seb_main_002.security.redis.RedisService;
import com.seb_main_002.security.util.CustomAuthorityUtils;
import com.seb_main_002.security.util.ErrorResponder;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    private final RedisService redisService;
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
    public Boolean verifyExistsAccountId(String accountId) {
        Optional<Member> optionalMember = memberRepository.findByAccountId(accountId);
        Boolean isExisted = false;
        if(optionalMember.isPresent()) {
            isExisted = true;
            return isExisted; // 중복이면 true
        }
        return isExisted; // 중복 아니면 false
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
        Boolean isExisted = verifyExistsAccountId(member.getAccountId());
        if(isExisted == true) {
            throw new BusinessLogicException(ExceptionCode.ACCOUNTID_EXISTS);
        }
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
        subscribe.setReserveProfit(0);
        subscribe.setTotalDeliveryDiscount(0);
        member.setSubscribe(subscribe);
        //카트 생성 후 저장
        Cart cart = new Cart();
        member.setCart(cart);
        memberRepository.save(member);
        return member;
    }

    @Transactional
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = request.getHeader("Refresh");

        if (!StringUtils.hasText(refreshToken)) {
            ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
        }
        // redis에서 refreshToken 삭제
        redisService.deleteRefreshToken(refreshToken);
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        if (!StringUtils.hasText(accessToken)) {
            ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
        }
        // redis에 accesstoken blackList로 등록
        redisService.setAccessTokenLogout(accessToken, jwtTokenizer.getAccessTokenExpirationMinutes());
    }
}
