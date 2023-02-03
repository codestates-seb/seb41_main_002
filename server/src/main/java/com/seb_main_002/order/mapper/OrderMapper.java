package com.seb_main_002.order.mapper;

import com.seb_main_002.delivery.entity.Delivery;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.order.dto.OrderInfoDto;
import com.seb_main_002.order.dto.OrderPostDto;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.entity.OrderItem;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    default Order orderPostDtoToOrder(OrderPostDto orderPostDto) {
        Order order = new Order();

        // order.setReserve(); 구독 여부를 확인하여 적립률을 달리함으로 service 계층에서 구현
        order.setTotalPrice(orderPostDto.getTotalPrice()); // 최종 결제 가격

        Member member = new Member();
        member.setMemberId(orderPostDto.getMemberId());
        order.setMember(member);

        Delivery delivery = new Delivery();
        order.setDelivery(delivery);

        List<OrderItem> orderItems = orderPostDto.getItemList().stream().map(itemInfo -> {
            OrderItem orderItem = new OrderItem();

            Item item = new Item();
            item.setItemId(itemInfo.getItemId());
            orderItem.setItem(item);
            orderItem.setItemCount(itemInfo.getItemCount());
            orderItem.setItemTotalPrice(itemInfo.getItemTotalPrice());
            orderItem.setOrder(order);

            return orderItem;
        }).collect(Collectors.toList());
        order.setOrderItems(orderItems);

        return order;
    }

    OrderInfoDto orderPostDtoToOrderInfo(OrderPostDto orderPostDto);
}
