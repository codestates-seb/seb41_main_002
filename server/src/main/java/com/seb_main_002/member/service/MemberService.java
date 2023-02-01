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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private final JavaMailSender javaMailSender;
    @Transactional
    public void updateSubscribe(Long memberId, Boolean isSubScribed, String SID) {
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
                subscribe.setSID(null);
            } else {
                //구독 신청의 경우
                subscribe.setIsSubscribed(isSubScribed);
                Integer sampleCount = subscribe.getSampleCount();
                subscribe.setSampleCount(sampleCount + 10);
                subscribe.setSubscribedDate(LocalDateTime.now());
                subscribe.setSID(SID);
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

        if(member.getEmail() != null) {
            // 기존 이메일과 동일할 경우에는 유효성 검증을 하지 않도록 수정하였습니다.
            if(!member.getEmail().equals(verifedMember.getEmail())) {
                verifyExistsEmail(member.getEmail());
            }
        }
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
    @Transactional
    public void sendMailWithAccountId(String email){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));

        // 1. 메일 수신인 지정
        simpleMailMessage.setTo(email);


        // 2. 메일 제목 설정
        simpleMailMessage.setSubject("Lacier 아이디 찾기 안내 이메일 입니다.");

        // 3. 메일 내용 설정
        String accountId = member.getAccountId();
        simpleMailMessage.setText("회원님의 아이디는 " + accountId + " 입니다.");
        // 4. 메일 전송
        javaMailSender.send(simpleMailMessage);

    }
    @Transactional
    public void sendMailWithPassword(String accountId, String email){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();


        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));

        if (member.getAccountId().equals(accountId)) {
            // 1. 메일 수신인 지정
            simpleMailMessage.setTo(email);

            // 2. 메일 제목 설정
            simpleMailMessage.setSubject("Lacier 비밀번호 찾기 안내 메일 입니다.");

            // 3. 메일 내용 설정 및 멤버의 임시번호 재설정

            String ramdomPassword = getRamdomPassword();

            String encryptedPassword = passwordEncoder.encode(ramdomPassword);
            member.setPassword(encryptedPassword);

            simpleMailMessage.setText("회원님의 임시비밀번호는 " + ramdomPassword + " 입니다.");
            // 4. 메일 전송
            javaMailSender.send(simpleMailMessage);
        } else {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }


    }

    private String getRamdomPassword() {

        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z' };

        int idx = 0;
        StringBuffer sb = new StringBuffer();

        for (int i = 0; i < 10; i++) {

            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를  Int로 추출 (소숫점제거)
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
    @Transactional
    public void updatePassword(Long memberId, String oldPassword, String newPassword) {
        Member verifyMember = verifyMember(memberId);

        // 기존 비밀번호와 바꾸려는 비밀번호가 같다면 예외처리
        if(oldPassword.equals(newPassword)) {
            throw new BusinessLogicException(ExceptionCode.SAME_PASSWORD);
        }
        // 입력한 비밀번호와 기존 비밀번호가 같다면 수정 진행
        if (passwordEncoder.matches(oldPassword,verifyMember.getPassword())) {
            String encryptedNewPassword = passwordEncoder.encode(newPassword);
            verifyMember.setPassword(encryptedNewPassword);
            memberRepository.save(verifyMember);
        } else {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }
    }
}

