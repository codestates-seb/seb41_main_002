package com.seb_main_002.order.repository;

import com.seb_main_002.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT o.* FROM ORDERS AS o JOIN ORDER_ITEM AS oi ON o.ORDER_ID WHERE o.MEMBER_ID = :memberId AND oi.ITEM_ID = :itemId", nativeQuery = true)
    List<Order> findOrdersByMemberIdAndItemId(Long memberId, Long itemId);
}
