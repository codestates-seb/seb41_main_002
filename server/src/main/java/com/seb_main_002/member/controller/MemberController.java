package com.seb_main_002.member.controller;

import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.dto.MemberPostDto;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.mapper.MemberMapper;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.member.service.MemberService;
import com.seb_main_002.security.jwt.JwtAuthenticationFilter;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberMapper mapper;
    private JwtVerificationFilter jwtVerificationFilter;

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @PatchMapping("/members/{memberId}/subscribe")
    public ResponseEntity subscribe(@PathVariable("memberId") Long memberId,
                                    @RequestBody MemberPatchDto requestBody) {
        Boolean isSubscribed = requestBody.getIsSubscribed();
        memberService.updateSubscribe(memberId,isSubscribed);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/members/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member),HttpStatus.OK);
    }
    @GetMapping("/members/edit/{memberId}")
    public ResponseEntity getMemberBeforeEdit(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberBeforeEditResponseDto(member),HttpStatus.OK);
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
        memberService.updateMember(memberId,member);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/members/{memberId}/payment")
    public ResponseEntity getMemberBeforeOrder(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberBeforeOrderResponseDto(member),HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberPostDto requestbody) {
        Member member = mapper.memberPostDtoToMember(requestbody);
        memberService.createMember(member);
        return new ResponseEntity(HttpStatus.OK);
    }
}
