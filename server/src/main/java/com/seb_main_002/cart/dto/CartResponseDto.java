package com.seb_main_002.cart.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CartResponseDto {
    Boolean isSubscribed;
    Integer memberReserve;

    List<CartInfo> cart;


    @Builder
    @Getter
    public static class CartInfo{
       Long cartItemId;
       Long itemId;
       String itemTitle;
       String titleImageURL;
       Integer itemCount;
       Integer itemTotalPrice;
    }
}
