package com.seb_main_002.order.controller;

import com.seb_main_002.delivery.entity.Delivery;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.order.dto.OrderInfo;
import com.seb_main_002.order.dto.OrderPostDto;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.entity.OrderItem;
import com.seb_main_002.order.mapper.OrderMapper;
import com.seb_main_002.order.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private OrderMapper mapper;
    private OrderService orderService;

    public OrderController(OrderMapper mapper,
                           OrderService orderService) {
        this.mapper = mapper;
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity postOrder(@RequestBody OrderPostDto orderPostDto) {
        Order order = mapper.orderPostDtoToOrder(orderPostDto);
        OrderInfo orderInfo = mapper.orderPostDtoToOrderInfo(orderPostDto);

        orderService.createOrder(order, orderInfo);



        // ----- ----- ----- ----- -----
        Order order = new Order();

        // Order 기본 column 설정
        orderService.reserveUsableCheck(orderPostDto.getMemberId(), orderPostDto.getUsedReserve());
        order.setTotalPrice(orderPostDto.getTotalPrice());
        order.setReserve(orderService.calculateReserve(orderPostDto.getMemberId(), orderPostDto.getItemsTotalPrice()));
        orderService.saveMemberReserve(orderPostDto.getMemberId(), order.getReserve());
        orderService.saveTotalDeliveryDiscount(orderPostDto.getMemberId());
        orderService.setReserveProfit(orderPostDto.getMemberId(), order.getReserve());

        // Order 연관관계 table 설정
        Member member = new Member();
        member.setMemberId(orderPostDto.getMemberId());
        order.setMember(member);

        List<OrderItem> orderItems = orderPostDto.getItemList().stream()
                .map(itemInfo -> {
                    OrderItem orderItem = new OrderItem();
                    Item item = new Item();
                    item.setItemId(itemInfo.getItemId());
                    orderItem.setItem(item);
                    orderItem.setOrder(order);
                    orderItem.setItemCount(itemInfo.getItemCount());
                    orderItem.setItemTotalPrice(itemInfo.getItemTotalPrice());
                    return orderItem;
                }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // delivery 설정하기
        Delivery delivery = orderService.setDeliveryAddress(member.getMemberId(), orderPostDto.getAddressId(), orderPostDto.getIsPrimary());
        order.setDelivery(delivery);

        orderService.createOrder(order);

        // ----- ----- ----- ----- -----

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
