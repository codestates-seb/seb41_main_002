package com.seb_main_002.review.service;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.repository.OrderRepository;
import com.seb_main_002.review.dto.ReviewResponseDto;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         MemberRepository memberRepository,
                         ItemRepository itemRepository,
                         OrderRepository orderRepository) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
    }

    public void createReview(Review review) {
        reviewRepository.save(review);
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

    public Review findReview(Long reviewId) {

        return verifyExistsReview(reviewId);
    }

    public ReviewResponseDto.ReviewItemDto findReviewItem(Long itemId, Long memberId) {
        Item verifiedItem = verifyExistsItem(itemId);
        Member verifiedMember = verifyExistsMember(memberId);

        List<Order> orders = orderRepository.findOrdersByMemberIdAndItemId(memberId, itemId);
        if(orders.size() > 0) {
            return ReviewResponseDto.ReviewItemDto.builder()
                    .itemTitle(verifiedItem.getItemTitle())
                    .categoryKRName(verifiedItem.getCategoryKRName())
                    .titleImageURL(verifiedItem.getTitleImageUrl())
                    .tagList(verifiedItem.getTagList())
                    .memberTagsList(verifiedMember.getTagList())
                    .build();
        } else {
            throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
        }
    }

    public void deleteReview(Long reviewId) {
        verifyExistsReview(reviewId);

        reviewRepository.deleteById(reviewId);
    }

    private Review verifyExistsReview(Long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    private Item verifyExistsItem(Long itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        return optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

    private Member verifyExistsMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
