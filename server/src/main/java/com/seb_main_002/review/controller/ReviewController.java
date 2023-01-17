package com.seb_main_002.review.controller;

import com.seb_main_002.review.dto.ReviewPatchDto;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.mapper.ReviewMapper;
import com.seb_main_002.review.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewMapper mapper;
    private final ReviewService reviewService;

    public ReviewController(ReviewMapper mapper, ReviewService reviewService) {
        this.mapper = mapper;
        this.reviewService = reviewService;
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity patchReview(@RequestBody ReviewPatchDto reviewPatchDto,
                                      @PathVariable Long reviewId) {
        Review review = mapper.reviewPatchDtoToReview(reviewPatchDto);
        review.setReviewId(reviewId);

        reviewService.updateReview(review);

        return new ResponseEntity<> (HttpStatus.OK);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity getReview(@PathVariable Long reviewId) {
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity<> (mapper.reviewToReviewResponseDto(review), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
