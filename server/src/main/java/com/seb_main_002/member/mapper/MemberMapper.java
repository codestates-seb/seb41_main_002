package com.seb_main_002.member.mapper;

import com.seb_main_002.Address.entity.Address;
import com.seb_main_002.member.dto.*;
import com.seb_main_002.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface MemberMapper {

    default MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member ==null) {
            return null;
        }



        //OrderResponseDto
        List<MemberResponseDto.OrderResponseDto> orderHistory = member.getOrders().stream().map(order -> MemberResponseDto.OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .orderCreatedAt(order.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm")))
                .orderStatus(order.getOrderStatus().toString())
                .totalPrice(order.getTotalPrice())
                .orderItems(order.getOrderItems().stream().map(orderItem -> MemberResponseDto.OrderItemResponseDto.builder()
                        .itemId(orderItem.getItem().getItemId())
                        .itemTitle(orderItem.getItem().getItemTitle())
                        .itemImageURL(orderItem.getItem().getTitleImageUrl())
                        .count(orderItem.getItemCount()).build()).collect(Collectors.toList())).build()).collect(Collectors.toList());

        //ReviewResponseDto
        List<MemberResponseDto.ReviewResponseDto> reviews = member.getReviews().stream().map(review -> MemberResponseDto.ReviewResponseDto.builder()
                .reviewId(review.getReviewId()).itemId(review.getItem().getItemId())
                .reviewTitle(review.getReviewTitle())
                .createdAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm")))
                .modifiedAt(review.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm")))
                .reviewRating(review.getReviewRating())
                .build()).collect(Collectors.toList());

        // 대표주소
        List<Address> addressList = member.getAddressList();
        String address = null;
        String zipcode = null;
        for (Address memberAddress : addressList) {
            if(memberAddress.getIsPrimary() ==true) {
                address = memberAddress.getAddress();
                zipcode = memberAddress.getZipcode();
            }
        }

        //MemberResponseDto
        return MemberResponseDto.builder()
                .accountId(member.getAccountId())
                .email(member.getEmail())
                .birthdate(member.getBirthdate())
                .phoneNumber(member.getPhoneNumber())
                .memberName(member.getName())
                .zipcode(zipcode)
                .address(address)
                .isSubscribed(member.getSubscribe().getIsSubscribed())
                .memberReserve(member.getMemberReserve())
                .tagList(member.getTagList())
                .ordersHistory(orderHistory)
                .reviews(reviews)
                .build();
    }

    default MemberBeforeEditResponseDto memberToMemberBeforeEditResponseDto(Member member) {
        if(member == null) {
            return null;
        }

        LocalDateTime subscribedDate = member.getSubscribe().getSubscribedDate();
        String stringSubscribedDate = null;

        if( subscribedDate != null) {
            stringSubscribedDate = subscribedDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm"));
        }



        List<MemberBeforeEditResponseDto.AddressDetailResponseDto> addresses = member.getAddressList().stream().map(address -> MemberBeforeEditResponseDto.AddressDetailResponseDto.builder()
                        .addressId(address.getAddressId())
                        .isPrimary(address.getIsPrimary())
                        .addressTitle(address.getAddressTitle())
                        .zipcode(address.getZipcode())
                        .address(address.getAddress())
                        .build())
                .collect(Collectors.toList());


        return MemberBeforeEditResponseDto.builder()
                .accountId(member.getAccountId())
                .memberName(member.getName())
                .birthdate(member.getBirthdate())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .addressList(addresses)
                .tagList(member.getTagList())
                .isSubscribed(member.getSubscribe().getIsSubscribed())
                .subscribedDate(stringSubscribedDate)
                .nowDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm")))
                .sampleCount(member.getSubscribe().getSampleCount())
                .totalDeliveryDiscount(member.getSubscribe().getTotalDeliveryDiscount())
                .reserveProfit(member.getSubscribe().getReserveProfit())
                .build();
    }
    default Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        Member member = new Member();
        member.setName(memberPatchDto.getMemberName());
        member.setEmail(memberPatchDto.getEmail());
        member.setPhoneNumber(memberPatchDto.getPhoneNumber());
        member.setTagList(memberPatchDto.getTagList());
        return member;
    }
    default MemberBeforeOrderResponseDto memberToMemberBeforeOrderResponseDto(Member member) {

        List<MemberBeforeEditResponseDto.AddressDetailResponseDto> addresses = member.getAddressList().stream().map(address -> MemberBeforeEditResponseDto.AddressDetailResponseDto.builder()
                        .addressId(address.getAddressId())
                        .isPrimary(address.getIsPrimary())
                        .addressTitle(address.getAddressTitle())
                        .zipcode(address.getZipcode())
                        .address(address.getAddress())
                        .build())
                .collect(Collectors.toList());

        return MemberBeforeOrderResponseDto.builder()
                .memberName(member.getName())
                .phoneNumber(member.getPhoneNumber())
                .isSubscribed(member.getSubscribe().getIsSubscribed())
                .memberReserve(member.getMemberReserve())
                .addressList(addresses)
                .build();
    }

     default Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if(memberPostDto == null) {
            return null;
        }

        Member member = new Member();
        member.setAccountId(memberPostDto.getAccountId());
        member.setPassword(memberPostDto.getPassword());
        member.setName(memberPostDto.getMemberName());
        member.setBirthdate(memberPostDto.getBirthDate());
        member.setEmail(memberPostDto.getEmail());
        member.setPhoneNumber(memberPostDto.getPhoneNumber());
        member.setMemberReserve(0);
        return member;
    }
}
