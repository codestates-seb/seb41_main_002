package com.seb_main_002.item.dto;

import com.seb_main_002.item.entity.Item;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ItemTopListResponseDto {

    List<TopItemDto> topList;

    public ItemTopListResponseDto(List<TopItemDto> topList){
        this.topList = topList;
    }

    @Builder
    @Getter
    public static class TopItemDto{
        private Long itemId;
        private String itemTitle;
        private String categoryKRName;
        private String categoryENName;
        private String titleImageURL;
        private Integer price;
        private Integer salesCount;
        private List<String> tagsList;

        public TopItemDto(Item item){
            this.itemId = item.getItemId();
            this.itemTitle = item.getItemTitle();
            this.categoryKRName = item.getCategoryKRName();
            this.categoryENName = item.getCategoryENName();
            this.titleImageURL = item.getTitleImageUrl();
            this.price = item.getPrice();
            this.salesCount = item.getSalesCount();
            this.tagsList = item.getTagList();
        }
    }
}
