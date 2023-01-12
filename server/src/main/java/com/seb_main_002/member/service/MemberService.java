package com.seb_main_002.member.service;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;

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
    public void postTags(Long memberId, List<String> tagList) {
        Member verifyMember = verifyMember(memberId);
        List<String> memberTagList = verifyMember.getTagList();
        memberTagList.clear();
        for (String tag : tagList) {
            memberTagList.add(tag);
        }
        memberRepository.save(verifyMember);
    }
}
