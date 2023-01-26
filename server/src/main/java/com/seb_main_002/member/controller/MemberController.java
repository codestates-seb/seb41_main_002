package com.seb_main_002.member.controller;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.dto.MemberMailRequestDto;
import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.dto.MemberPostDto;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.mapper.MemberMapper;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.member.service.MemberService;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final JwtVerificationFilter jwtVerificationFilter;

    @PatchMapping("/members/{memberId}/subscribe")
    public ResponseEntity subscribe(@PathVariable("memberId") Long memberId,
                                    @Valid @RequestBody MemberPatchDto requestBody) {
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
                                      @Valid @RequestBody MemberPatchDto requestBody) {
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
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto requestbody) {
        Member member = mapper.memberPostDtoToMember(requestbody);
        memberService.createMember(member);
        return new ResponseEntity(HttpStatus.OK);
    }
    Map<String, Object> response = new HashMap<>();
    @GetMapping("/user/access-token")
    public ResponseEntity accessToken(HttpServletRequest request) {
                Map<String, Object> claims = jwtVerificationFilter.verifyJws(request);
                Map<String, Object> response = new HashMap<>();
                response.put("accountId",claims.get("accountId"));
                response.put("memberId",claims.get("memberId"));
                return new ResponseEntity(response,HttpStatus.OK);
        }
    @GetMapping("/idcheck/{accountId}")
    public ResponseEntity accountIdCheck(@PathVariable("accountId") String accountId) {
        Boolean aBoolean = memberService.verifyExistsAccountId(accountId);
        return new ResponseEntity(aBoolean,HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
       memberService.logout(request,response);
       return new ResponseEntity(HttpStatus.OK);
    }
    @PostMapping("/accountid")
    @ResponseStatus(HttpStatus.OK)
    public void findAccountId(@RequestBody MemberMailRequestDto memberMailRequestDto){
        String email = memberMailRequestDto.getEmail();
        memberService.sendMailWithAccountId(email);
    }
    @PostMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    public void findpassword(@RequestBody MemberMailRequestDto memberMailRequestDto){
        String email = memberMailRequestDto.getEmail();
        String accountId = memberMailRequestDto.getAccountId();
        memberService.sendMailWithPassword(accountId,email);
    }
}