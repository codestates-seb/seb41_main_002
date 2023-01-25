package com.seb_main_002.order.repository;

import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT o.* FROM ORDERS AS o JOIN ORDER_ITEM AS oi ON o.ORDER_ID WHERE o.MEMBER_ID = :memberId AND oi.ITEM_ID = :itemId", nativeQuery = true)
    List<Order> findOrdersByMemberIdAndItemId(Long memberId, Long itemId);

    @Query(value = "SELECT oi.* FROM order_items AS oi JOIN orders AS o ON oi.order_id WHERE o.member_id = :memberId AND oi.order_item_id = :orderItemId", nativeQuery = true)
    Optional<OrderItem> findOrderItemByMemberIdAndOrderItemId(Long memberId, Long orderItemId);
}
