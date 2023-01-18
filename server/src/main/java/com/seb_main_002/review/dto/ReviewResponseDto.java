package com.seb_main_002.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class ReviewResponseDto {
    @Getter
    @Builder
    public static class ReviewDto {
        private String reviewTitle;

        private String reviewContent;
    }

    @Getter
    @Builder
    public static class ReviewItemDto {
        private String itemTitle;

        private String categoryKRName;

        private String titleImageURL;

        private List<String> tagList;

        private List<String> memberTagsList;
    }
}