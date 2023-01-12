package com.seb_main_002.order.service;

import com.seb_main_002.Address.entity.Address;
import com.seb_main_002.delivery.entity.Delivery;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.repository.OrderRepository;
import com.seb_main_002.subscribe.entity.Subscribe;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private MemberRepository memberRepository;

    public OrderService(OrderRepository orderRepository, MemberRepository memberRepository) {
        this.orderRepository = orderRepository;
        this.memberRepository = memberRepository;
    }

    public void createOrder(Order order) {
        orderRepository.save(order);
    }

    // reserveUsableCheck
    // 사용하려는 적립금이 보유중인 적립금 범위 내인지 판단 후 계산된 값을 member의 적립금에 저장합니다.
    public void reserveUsableCheck(Long memberId, Integer wantUseReserve) {
        Member findMember = verifyMember(memberId);

        if(findMember.getMemberReserve() >= wantUseReserve) {
            findMember.setMemberReserve(findMember.getMemberReserve() - wantUseReserve);
            memberRepository.save(findMember);
        } else {
            throw new BusinessLogicException(ExceptionCode.CANNOT_POST_ORDER);
        }
    }

    // saveTotalDeliveryDiscount
    // 구독중인 member가 주문할 경우 2000원의 배송 할인 내역을 subscribe에 저장합니다.
    public void saveTotalDeliveryDiscount(Long memberId) {
        Member findMember = verifyMember(memberId);

        Subscribe subscribe = findMember.getSubscribe();

        if(subscribe.getIsSubscribed()) {
            subscribe.setTotalDeliveryDiscount(subscribe.getTotalDeliveryDiscount() + 2000);
            findMember.setSubscribe(subscribe);

            memberRepository.save(findMember);
        }
    }

    // calculateReserve
    // 해당 주문으로 인해 적립되는 적립금을 계산합니다.
    public int calculateReserve(Long memberId, Integer itemsTotalPrice) {
        Member findMember = verifyMember(memberId);

        int reservePercent = findMember.getSubscribe().getIsSubscribed() ? 5 : 3;

        return (itemsTotalPrice / 100) * reservePercent;
    }

    // saveMemberReserve
    // 해당 주문으로 인해 적립되는 적립금을 member에 저장합니다.
    public void saveMemberReserve(Long memberId, Integer reserve) {
        Member findMember = verifyMember(memberId);

        findMember.setMemberReserve(findMember.getMemberReserve() + reserve);

        memberRepository.save(findMember);
    }

    // setDeliveryAddress
    // 해당 주문의 배송지를 delivery에 저장하고 대표 배송지 변경 사항을 감지하여 address에 저장합니다.
    public Delivery setDeliveryAddress(Long memberId, Long addressId, Boolean isPrimary) {
        Member findMember = verifyMember(memberId);

        Delivery delivery = new Delivery();
        List<Address> addressList = findMember.getAddressList();

        // 배송지 설정
        addressList.stream().forEach(address -> {
            if(address.getAddressId().equals(addressId)) {
                delivery.setAddress(address.getAddress());
                delivery.setZipcode(address.getZipcode());
            }
        });

        // 대표 배송지 설정
        if(isPrimary) {
            addressList.stream().forEach(address -> {
                if(address.getAddressId().equals(addressId)) {
                    address.setIsPrimary(true);
                } else {
                    address.setIsPrimary(false);
                }
            });
        }
        findMember.setAddressList(addressList);
        memberRepository.save(findMember);

        return delivery;
    }

    // setReserveProfit
    // 구독중인 member가 주문할 경우 구독자 추가 적립 내역을 subscribe에 저장합니다.
    public void setReserveProfit(Long memberId, Integer reserve) {
        Member findMember = verifyMember(memberId);
        if(findMember.getSubscribe().getIsSubscribed()) {
            findMember.getSubscribe().setReserveProfit((reserve / 5) * 2);
            memberRepository.save(findMember);
        }
    }

    public Member verifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }

}
