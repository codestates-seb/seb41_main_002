package com.seb_main_002.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@NoArgsConstructor
public class OrderPostDto {
    @Positive
    private Long memberId;

    private Boolean isPrimary;

    @Positive
    private Long addressId;

    @Valid
    @NotNull(message = "주문할 상품 정보는 필수입니다.")
    private List<ItemInfo> itemList;

    @Min(value = 0)
    private Integer itemsTotalPrice;

    @Min(value = 0)
    private Integer totalPrice;

    @Min(value = 0)
    private Integer usedReserve;

    @Getter
    @NoArgsConstructor
    public static class ItemInfo {
        @Positive
        private Long itemId;

        @Min(value = 0)
        private Integer itemCount;

        @Min(value = 0)
        private Integer itemTotalPrice;
    }
}
