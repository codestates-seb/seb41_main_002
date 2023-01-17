package com.seb_main_002.member.controller;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.dto.MemberPostDto;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.mapper.MemberMapper;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.member.service.MemberService;
import com.seb_main_002.security.jwt.JwtTokenizer;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import com.seb_main_002.security.redis.JwtRefreshToken;
import com.seb_main_002.security.redis.JwtRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final JwtVerificationFilter jwtVerificationFilter;
    private final JwtRefreshTokenRepository jwtRefreshTokenRepository;

    @PatchMapping("/members/{memberId}/subscribe")
    public ResponseEntity subscribe(@PathVariable("memberId") Long memberId,
                                    @RequestBody MemberPatchDto requestBody) {
        Boolean isSubscribed = requestBody.getIsSubscribed();
        memberService.updateSubscribe(memberId, isSubscribed);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/members/edit/{memberId}")
    public ResponseEntity getMemberBeforeEdit(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberBeforeEditResponseDto(member), HttpStatus.OK);
    }

    @PatchMapping("/members/edit/{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId") Long memberId,
                                      @RequestBody MemberPatchDto requestBody) {
        Member member = mapper.memberPatchDtoToMember(requestBody);
        memberService.updateMember(memberId, member);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/members/{memberId}/tags")
    public ResponseEntity postTags(@PathVariable("memberId") Long memberId,
                                   @RequestBody MemberPatchDto requestBody) {
        Member member = mapper.memberPatchDtoToMember(requestBody);
        memberService.updateMember(memberId, member);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members/{memberId}/payment")
    public ResponseEntity getMemberBeforeOrder(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberBeforeOrderResponseDto(member), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberPostDto requestbody) {
        Member member = mapper.memberPostDtoToMember(requestbody);
        memberService.createMember(member);
        return new ResponseEntity(HttpStatus.OK);
    }
    Map<String, Object> response = new HashMap<>();
    @GetMapping("/user/access-token")
    public ResponseEntity accessToken(HttpServletRequest request) {
        String accessToken = "";

        accessToken = request.getHeader("Authorization");
        if ((!accessToken.equals(""))) {
            try {
                response = jwtVerificationFilter.verifyJws(request);
                return new ResponseEntity(response, HttpStatus.OK);

            } catch (Exception e) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
    }
//    @PostMapping("/user/refresh-token")
//    public ResponseEntity refreshToken(HttpServletRequest request,HttpServletResponse response) {
//        String refreshToken = "";
//        refreshToken = request.getHeader("Authorization");
//        if ((!refreshToken.equals(""))) {
//            try {
//                JwtRefreshToken jwtRefreshToken = jwtRefreshTokenRepository.findById(refreshToken)
//                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
//                String accountId = jwtRefreshToken.getAccountId();
//                Member member = memberRepository.findByAccountId(accountId).get();
//                String accessToken = memberService.delegateAccessToken(member);
//                response.setHeader("Authorization", "Bearer " + accessToken);
//                return new ResponseEntity(response, HttpStatus.OK);
//
//            } catch (Exception e) {
//                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
//            }
//        } else {
//            return new ResponseEntity(HttpStatus.FORBIDDEN);
//        }
//    }
    @GetMapping("/idcheck/{accountId}")
    public ResponseEntity accountIdCheck(@PathVariable("accountId") String accountId) {
       memberService.verifyExistsAccountId(accountId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
