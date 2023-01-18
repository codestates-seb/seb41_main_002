package com.seb_main_002.item.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ItemSearchResponseDto {

    MemberTagInfo member;

    List<SearchItemDto> cosmetics;

    @Builder
    @Getter
    public static class SearchItemDto{
        private Long itemId;
        private String itemTitle;
        private String categoryKRName;
        private String categoryENName;
        private String titleImageURL;
        private Integer price;
        private List<String> tagsList;
    }

    @Builder
    @Getter
    public static class MemberTagInfo{
        private List<String> memberTagsList = null;
    }

}
