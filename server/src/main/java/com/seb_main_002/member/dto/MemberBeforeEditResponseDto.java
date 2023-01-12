package com.seb_main_002.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class MemberBeforeEditResponseDto {
    private String accountId;
    private String memberName;
    private String birthdate;
    private String email;
    private String phoneNumber;
    private List<AddressDetailResponseDto> addressList = new ArrayList<>();
    private List<String> tagList = new ArrayList<>();
    private Boolean isSubscribed;
    private String subscribedDate;
    private String nowDate;
    private Integer sampleCount;
    private Integer totalDeliveryDiscount;
    private Integer reserveProfit;

    @Getter
    @Builder
    public static class AddressDetailResponseDto{
        private Long addressId;
        private Boolean isPrimary;
        private String addressTitle;
        private String zipcode;
        private String address;
    }
}
