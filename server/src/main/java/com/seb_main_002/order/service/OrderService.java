package com.seb_main_002.order.service;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.order.dto.OrderInfoDto;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class OrderService {
    private OrderRepository orderRepository;
    private MemberRepository memberRepository;
    private AddressRepository addressRepository;
    private ItemRepository itemRepository;

    public OrderService(OrderRepository orderRepository,
                        MemberRepository memberRepository,
                        AddressRepository addressRepository,
                        ItemRepository itemRepository) {
        this.orderRepository = orderRepository;
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
        this.itemRepository = itemRepository;
    }

    public void createOrder(Long tokenMemberId, Order order, OrderInfoDto orderInfoDto) {
        Long memberId = order.getMember().getMemberId();

        if(!tokenMemberId.equals(memberId)) throw new BusinessLogicException(ExceptionCode.CANNOT_POST_ORDER);

        Member member = verifyMember(memberId);
        boolean isSubscribed = member.getSubscribe().getIsSubscribed();

        // 사용하려는 적립금과 보유한 적립금을 계산 후 적립금 차감
        if(member.getMemberReserve() < orderInfoDto.getUsedReserve()) throw new BusinessLogicException(ExceptionCode.CANNOT_POST_ORDER);
        member.setMemberReserve(member.getMemberReserve() - orderInfoDto.getUsedReserve());

        Integer reserve;

        if(isSubscribed) {
            // 구독자: 5% 적립, 2% 추가 적립 내역 기록, 2000원 배송비 할인 내역 기록
            reserve = (orderInfoDto.getItemsTotalPrice() / 100) * 5;
            member.setMemberReserve(member.getMemberReserve() + reserve);
            member.getSubscribe().setReserveProfit((orderInfoDto.getItemsTotalPrice() / 100) * 2);
            member.getSubscribe().setTotalDeliveryDiscount(member.getSubscribe().getTotalDeliveryDiscount() + 2000);
        } else {
            // 비구독자: 3% 적립
            reserve = (orderInfoDto.getItemsTotalPrice() / 100) * 3;
            member.setMemberReserve(member.getMemberReserve() + reserve);
        }
        order.setReserve(reserve);

        // 배송지 설정
        Address deliveryAddress = verifyExistAddress(orderInfoDto.getAddressId());
        order.getDelivery().setAddress(deliveryAddress.getAddress());
        order.getDelivery().setZipcode(deliveryAddress.getZipcode());

        // 대표 배송지 변경 요청 시 변경
        if(orderInfoDto.getIsPrimary()) {
            addressRepository.findAddressesByMemberId(memberId).forEach(address -> {
                if(address.getAddressId().equals(orderInfoDto.getAddressId())) {
                    address.setIsPrimary(true);
                } else {
                    address.setIsPrimary(false);
                }
            });
        }

        // 상품 판매량 변경
        order.getOrderItems().forEach(orderItem -> {
            Item item = verifyExistItem(orderItem.getItem().getItemId());
            item.setSalesCount(item.getSalesCount() + orderItem.getItemCount());
            itemRepository.save(item);
        });

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

    private Item verifyExistItem(Long itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        return optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }
}
