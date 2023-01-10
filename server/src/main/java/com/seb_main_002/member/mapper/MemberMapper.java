package com.seb_main_002.member.mapper;

import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.dto.MemberResponseDto;
import com.seb_main_002.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);
    default MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member ==null) {
            return null;
        }
        MemberResponseDto.ReviewResponseDto.builder();

        //addressResponseDto
        List<MemberResponseDto.AddressResponseDto> addresses = member.getAddressList().stream()
                .map(address -> MemberResponseDto.AddressResponseDto.builder()
                        .zipcode(address.getZipCode())
                        .address(address.getAddress()).build()).collect(Collectors.toList());


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

        //
        return MemberResponseDto.builder()
                .accountId(member.getAccountId())
                .email(member.getEmail())
                .birthdate(member.getBirthdate())
                .memberName(member.getName())
                .addresses(addresses)
                .tags(member.getTagList())
                .ordersHistory(orderHistory)
                .reviews(reviews)
                .build();
    }
}