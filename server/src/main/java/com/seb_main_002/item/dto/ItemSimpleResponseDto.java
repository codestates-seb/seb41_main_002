package com.seb_main_002.item.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Builder
@Getter
public class ItemSimpleResponseDto {
    ItemInfo iteminfo;

    List<ItemReviewResponseDto> reviews;

    @Builder
    @Getter
    public static class ItemInfo{
        private Long itemId;
        private String itemTitle;
        private String categoryKRName;
        private String titleImageURL;
        private String contentImageURL;
        private String content;
        private Integer price;
        private List<String> tagList;
        private Double rating;
    }

    @Builder
    @Getter
    public static class ItemReviewResponseDto{
        private Long memberId;
        private String accountId;
        private Long reviewId;
        private String reviewTitle;
        private String reviewContent;
        private String createdAt;
        private String modifiedAt;
        private Double reviewRating;
    }
}
