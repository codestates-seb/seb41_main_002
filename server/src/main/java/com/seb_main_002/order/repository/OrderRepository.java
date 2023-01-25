package com.seb_main_002.order.repository;

import com.seb_main_002.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT o.* FROM orders AS o JOIN order_item AS oi ON o.order_id WHERE o.member_id = :memberId AND oi.item_id = :itemId", nativeQuery = true)
    List<Order> findOrdersByMemberIdAndItemId(Long memberId, Long itemId);
}
