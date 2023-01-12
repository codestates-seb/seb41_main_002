package com.seb_main_002.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MemberResponseDto {
    private String accountId;
    private String email;
    private String birthdate;
    private String memberName;
    private String zipcode;
    private String address;
    private Boolean isSubscribed;
    private Integer memberReserve;
    private List<String> tagList;
    private List<OrderResponseDto> ordersHistory;
    private List<ReviewResponseDto> reviews;

    @Getter
    @Builder
    public static class OrderResponseDto {
        private Long orderId;
        private String orderCreatedAt;
        private String orderStatus;
        private Integer totalPrice;
        private List<OrderItemResponseDto> orderItems;
    }

    @Getter
    @Builder
    public static class OrderItemResponseDto {
        private Long itemId;
        private String itemImageURL;
        private String itemTitle;
        private Integer count;
    }
    @Getter
    @Builder
    public static class ReviewResponseDto {
        private Long reviewId;
        private Long itemId;
        private String reviewTitle;
        private String createdAt;
        private String modifiedAt;
        private Double reviewRating;
    }

}


