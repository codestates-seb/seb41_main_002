package com.seb_main_002.member.controller;

import com.seb_main_002.member.dto.SubscribePatchDto;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.member.service.MemberService;
import com.seb_main_002.subscribe.entity.Subscribe;
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

    @PatchMapping("/{memberId}/subscribe")
    public ResponseEntity subscribe(@PathVariable("memberId") Long memberId,
                                    @RequestBody SubscribePatchDto requestBody) {
        Boolean isSubscribed = requestBody.getIsSubscribed();
        memberService.updateSubscribe(memberId,isSubscribed);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
