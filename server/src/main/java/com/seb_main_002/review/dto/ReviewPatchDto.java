package com.seb_main_002.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewPatchDto {
    private Long memberId;

    private String reviewTitle;

    private String reviewContent;
}
