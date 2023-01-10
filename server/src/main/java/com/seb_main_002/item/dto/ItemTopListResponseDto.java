package com.seb_main_002.item.dto;

import com.seb_main_002.item.entity.Item;
import lombok.Getter;

import java.util.List;

@Getter
public class ItemTopListResponseDto {

    private Long itemId;
    private String itemTitle;
    private String categoryKRName;
    private String categoryENName;
    private String titleImageURL;
    private Integer price;
    private Integer salesCount;
    private List<String> tagsList;

    public ItemTopListResponseDto(Item item) {
        this.itemId = item.getItemId();
        this.itemTitle = item.getItemTitle();
        this.categoryKRName = item.getCategoryKRName();
        this.categoryENName = item.getCategoryENName();
        this.titleImageURL = item.getTitleImageUrl();
        this.price = item.getPrice();
        this.salesCount = item.getSalesCount();
        this.tagsList = item.getTagList();
    }
    @Getter
    public static class Response {
        List<ItemTopListResponseDto> topList;
        public Response(List<ItemTopListResponseDto> topList){
            this.topList = topList;
        }
    }

}
