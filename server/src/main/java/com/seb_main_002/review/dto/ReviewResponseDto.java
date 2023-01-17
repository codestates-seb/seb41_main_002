package com.seb_main_002.review.dto;

import lombok.Builder;
import lombok.Getter;

public class ReviewResponseDto {
    @Getter
    @Builder
    public static class ReviewDto {
        private String reviewTitle;

        private String reviewContent;
    }
}