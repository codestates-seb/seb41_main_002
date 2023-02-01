package com.seb_main_002.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
public class ReviewPatchDto {
    @Positive
    private Long memberId;

    private String reviewTitle;

    private String reviewContent;

    private Double reviewRating;
}
