package com.seb_main_002.member.controller;

import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.mapper.MemberMapper;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PatchMapping("/{memberId}/subscribe")
    public ResponseEntity subscribe(@PathVariable("memberId") Long memberId,
                                    @RequestBody MemberPatchDto requestBody) {
        Boolean isSubscribed = requestBody.getIsSubscribed();
        memberService.updateSubscribe(memberId,isSubscribed);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member),HttpStatus.OK);
    }
    @GetMapping("/edit/{memberId}")
    public ResponseEntity getMemberBeforeEdit(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberBeforeEditResponseDto(member),HttpStatus.OK);
    }
    @PatchMapping("/edit/{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId") Long memberId,
                                      @RequestBody MemberPatchDto requestBody) {
        Member member = mapper.memberPatchDtoToMember(requestBody);
        memberService.updateMember(memberId, member);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/{memberId}/tags")
    public ResponseEntity postTags(@PathVariable("memberId") Long memberId,
                                   @RequestBody MemberPatchDto requestBody) {
        Member member = mapper.memberPatchDtoToMember(requestBody);
        memberService.updateMember(memberId,member);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{memberId}/payment")
    public ResponseEntity getMemberBeforeOrder(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberBeforeOrderResponseDto(member),HttpStatus.OK);
    }
}
