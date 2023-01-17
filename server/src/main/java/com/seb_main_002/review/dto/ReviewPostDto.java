package com.seb_main_002.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewPostDto {
    private Long itemId;

    private Long memberId;

    private Double reviewRating;

    private String reviewTitle;

    private String reviewContent;

}
