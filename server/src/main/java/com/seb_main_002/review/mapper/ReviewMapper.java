package com.seb_main_002.review.mapper;

import com.seb_main_002.item.entity.Item;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.review.dto.ReviewPatchDto;
import com.seb_main_002.review.dto.ReviewPostDto;
import com.seb_main_002.review.dto.ReviewResponseDto;
import com.seb_main_002.review.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        Review review = new Review();
        Member member = new Member();
        member.setMemberId(reviewPostDto.getMemberId());
        Item item = new Item();
        item.setItemId(reviewPostDto.getItemId());

        review.setItem(item);
        review.setMember(member);
        review.setReviewRating(reviewPostDto.getReviewRating());
        review.setReviewTitle(reviewPostDto.getReviewTitle());
        review.setReviewContent(reviewPostDto.getReviewContent());

        return review;
    }

    default Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        Review review = new Review();
        Member member = new Member();
        member.setMemberId(reviewPatchDto.getMemberId());

        review.setMember(member);
        review.setReviewRating(reviewPatchDto.getReviewRating());
        review.setReviewTitle(reviewPatchDto.getReviewTitle());
        review.setReviewContent(reviewPatchDto.getReviewContent());

        return review;
    }

    default ReviewResponseDto.ReviewDto reviewToReviewResponseDto(Review review, Item item) {
        return ReviewResponseDto.ReviewDto.builder()
                .memberId(review.getMember().getMemberId())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .reviewRating(review.getReviewRating())
                .itemTitle(item.getItemTitle())
                .titleImageURL(item.getTitleImageUrl())
                .build();
    }
}
