package com.seb_main_002.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OrderPostDto {
    private Long memberId;

    private Boolean isPrimary;

    private Long addressId;

    private List<ItemInfo> itemList;

    private Integer itemsTotalPrice;

    private Integer totalPrice;

    private Integer usedReserve;

    @Getter
    @NoArgsConstructor
    public static class ItemInfo {
        private Long itemId;

        private Integer itemCount;

        private Integer itemTotalPrice;
    }
}
