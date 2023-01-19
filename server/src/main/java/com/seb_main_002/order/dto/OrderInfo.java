package com.seb_main_002.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfo {
    private Boolean isPrimary;

    private Long addressId;

    private Integer itemsTotalPrice;

    private Integer usedReserve;
}
