package com.seb_main_002.item.dto;

import com.seb_main_002.item.entity.Item;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ItemTopListResponseDto {
    MemberTagInfo member;
    List<TopItemDto> topList;


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

    }
}
