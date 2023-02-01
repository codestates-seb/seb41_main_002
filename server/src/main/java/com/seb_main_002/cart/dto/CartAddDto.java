package com.seb_main_002.cart.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class CartAddDto {
    @Positive
    private Long itemId;
    @Positive
    private Integer itemCount;
    @Positive
    private Integer itemTotalPrice;
}
