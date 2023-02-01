package com.seb_main_002.review.repository;

import com.seb_main_002.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT * FROM review WHERE item_id = :itemId", nativeQuery = true)
    List<Review> findReviewsByItemId(Long itemId);
}
