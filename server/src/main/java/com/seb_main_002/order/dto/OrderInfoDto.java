package com.seb_main_002.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfoDto {
    private Boolean isPrimary;

    @Positive
    private Long addressId;

    @Positive
    private Integer itemsTotalPrice;

    @Positive
    private Integer usedReserve;
}
