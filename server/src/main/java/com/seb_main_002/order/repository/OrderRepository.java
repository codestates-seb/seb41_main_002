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
    @Query(value = "SELECT order_id FROM order_item WHERE order_item_id = :orderItemId", nativeQuery = true)
    Optional<Long> findOrderIdByOrderItemId(Long orderItemId);
}
