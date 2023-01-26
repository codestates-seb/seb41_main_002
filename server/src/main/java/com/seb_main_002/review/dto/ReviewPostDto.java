package com.seb_main_002.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
public class ReviewPostDto {
    private Long orderItemId;

    @Positive
    private Long itemId;

    @Positive
    private Long memberId;

    @Positive
    private Double reviewRating;

    @NotBlank(message = "리뷰 제목은 공백이 아니어야 합니다.")
    private String reviewTitle;

    @NotBlank(message = "리뷰 본문은 공백이 아니어야 합니다.")
    private String reviewContent;

}
