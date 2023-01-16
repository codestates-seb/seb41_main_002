package com.seb_main_002.review.controller;

import com.seb_main_002.review.dto.ReviewPatchDto;
import com.seb_main_002.review.dto.ReviewPostDto;
import com.seb_main_002.review.dto.ReviewResponseDto;
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

    @PostMapping
    public ResponseEntity postReview(@RequestBody ReviewPostDto reviewPostDto) {
        reviewService.createReview(mapper.reviewPostDtoToReview(reviewPostDto));

        return new ResponseEntity<> (HttpStatus.OK);
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

    @GetMapping("-item/{itemId}")
    public ResponseEntity getReviewItem(@PathVariable Long itemId) {
        // memberId는 stub으로 고정, 추후 tokent에서 memberId를 꺼낼 수 있게 되면 해당 기능 구현 예정
        ReviewResponseDto.ReviewItemDto reviewItem = reviewService.findReviewItem(itemId, (long) 1);

        return new ResponseEntity<> (reviewItem, HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
