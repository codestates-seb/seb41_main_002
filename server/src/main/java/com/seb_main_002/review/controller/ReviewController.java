package com.seb_main_002.review.controller;

import com.seb_main_002.item.entity.Item;
import com.seb_main_002.review.dto.ReviewPatchDto;
import com.seb_main_002.review.dto.ReviewPostDto;
import com.seb_main_002.review.dto.ReviewResponseDto;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.mapper.ReviewMapper;
import com.seb_main_002.review.service.ReviewService;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@Validated
public class ReviewController {
    private final ReviewMapper mapper;
    private final ReviewService reviewService;
    private final JwtVerificationFilter jwtVerificationFilter;

    public ReviewController(ReviewMapper mapper,
                            ReviewService reviewService,
                            JwtVerificationFilter jwtVerificationFilter) {
        this.mapper = mapper;
        this.reviewService = reviewService;
        this.jwtVerificationFilter = jwtVerificationFilter;
    }

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto reviewPostDto) {
        Long orderItemId = reviewPostDto.getOrderItemId();

        reviewService.createReview(mapper.reviewPostDtoToReview(reviewPostDto), orderItemId);

        return new ResponseEntity<> (HttpStatus.OK);
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity patchReview(@Valid @RequestBody ReviewPatchDto reviewPatchDto,
                                      @PathVariable Long reviewId) {
        Review review = mapper.reviewPatchDtoToReview(reviewPatchDto);
        review.setReviewId(reviewId);

        reviewService.updateReview(review);

        return new ResponseEntity<> (HttpStatus.OK);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity getReview(@PathVariable Long reviewId) {
        Review review = reviewService.findReview(reviewId);
        Item reviewItem = review.getItem();

        return new ResponseEntity<> (mapper.reviewToReviewResponseDto(review, reviewItem), HttpStatus.OK);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity getReviewItem(@PathVariable Long itemId,
                                        HttpServletRequest request) {
        Map<String, Object>  response = jwtVerificationFilter.verifyJws(request);
        Long memberId = ((Number)response.get("memberId")).longValue();

        ReviewResponseDto.ReviewItemDto reviewItem = reviewService.findReviewItem(itemId, memberId);

        return new ResponseEntity<> (reviewItem, HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
