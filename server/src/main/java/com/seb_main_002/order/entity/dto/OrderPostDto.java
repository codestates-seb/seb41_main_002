package com.seb_main_002.order.entity.dto;

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

    private static class ItemInfo {
        private Long itemId;

        private String titleImageUrl;

        private String itemTitle;

        private Integer itemCount;

        private Integer itemTotalPrice;
    }
}
