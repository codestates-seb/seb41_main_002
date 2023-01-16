package com.seb_main_002.review.service;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void updateReview(Review review) {
        Review verifiedReview = verifyExistsReview(review.getReviewId());
        Long savedReviewMemberId = verifiedReview.getMember().getMemberId();
        Long requestReviewMemberId = review.getMember().getMemberId();

        if(savedReviewMemberId.equals(requestReviewMemberId)) {
            verifiedReview.setReviewTitle(review.getReviewTitle());
            verifiedReview.setReviewContent(review.getReviewContent());

            reviewRepository.save(verifiedReview);
        }  else {
            throw new BusinessLogicException(ExceptionCode.CANNOT_MODIFY_REVIEW);
        }
    }

    private Review verifyExistsReview(Long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }
}
