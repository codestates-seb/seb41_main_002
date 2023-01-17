package com.seb_main_002.review.mapper;

import com.seb_main_002.member.entity.Member;
import com.seb_main_002.review.dto.ReviewPatchDto;
import com.seb_main_002.review.dto.ReviewResponseDto;
import com.seb_main_002.review.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    default Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        Review review = new Review();
        Member member = new Member();
        member.setMemberId(reviewPatchDto.getMemberId());

        review.setMember(member);
        review.setReviewTitle(reviewPatchDto.getReviewTitle());
        review.setReviewContent(reviewPatchDto.getReviewContent());

        return review;
    }

    default ReviewResponseDto.ReviewDto reviewToReviewResponseDto(Review review) {
        return ReviewResponseDto.ReviewDto.builder()
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .build();
    }
}
