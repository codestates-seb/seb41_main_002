package com.seb_main_002.order.service;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.delivery.entity.Delivery;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.order.dto.OrderInfo;
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
    private AddressRepository addressRepository;

    public OrderService(OrderRepository orderRepository,
                        MemberRepository memberRepository,
                        AddressRepository addressRepository) {
        this.orderRepository = orderRepository;
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
    }

    public void createOrder(Order order, OrderInfo orderInfo) {
        Long memberId = order.getMember().getMemberId();

        Member member = verifyMember(memberId);
        boolean isSubscribed = member.getSubscribe().getIsSubscribed();

        // 사용하려는 적립금과 보유한 적립금을 계산 후 적립금 차감
        if(member.getMemberReserve() < orderInfo.getUsedReserve()) throw new BusinessLogicException(ExceptionCode.CANNOT_POST_ORDER);
        member.setMemberReserve(member.getMemberReserve() - orderInfo.getUsedReserve());

        Integer reserve;

        if(isSubscribed) {
            // 구독자: 5% 적립, 2% 추가 적립 내역 기록, 2000원 배송비 할인 내역 기록
            reserve = (orderInfo.getItemsTotalPrice() / 100) * 5;
            member.setMemberReserve(member.getMemberReserve() + reserve);
            member.getSubscribe().setReserveProfit((orderInfo.getItemsTotalPrice() / 100) * 2);
            member.getSubscribe().setTotalDeliveryDiscount(member.getSubscribe().getTotalDeliveryDiscount() + 2000);
        } else {
            // 비구독자: 3% 적립
            reserve = (orderInfo.getItemsTotalPrice() / 100) * 3;
            member.setMemberReserve(member.getMemberReserve() + reserve);
        }
        order.setReserve(reserve);

        // 배송지 설정
        Address deliveryAddress = verifyExistAddress(orderInfo.getAddressId());
        order.getDelivery().setAddress(deliveryAddress.getAddress());
        order.getDelivery().setZipcode(deliveryAddress.getZipcode());

        // 대표 배송지 변경 요청 시 변경
        if(orderInfo.getIsPrimary()) {
            addressRepository.findAddressesByMemberId(memberId).forEach(address -> {
                if(address.getAddressId().equals(orderInfo.getAddressId())) {
                    address.setIsPrimary(true);
                } else {
                    address.setIsPrimary(false);
                }
            });
        }

        // 수정된 member 정보 저장
        memberRepository.save(member);
        // order 저장
        orderRepository.save(order);
    }

    public Member verifyMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }

    private Address verifyExistAddress(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
    }
}
