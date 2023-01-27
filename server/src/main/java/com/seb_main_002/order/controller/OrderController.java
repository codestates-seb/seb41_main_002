package com.seb_main_002.order.controller;

import com.seb_main_002.order.dto.OrderInfoDto;
import com.seb_main_002.order.dto.OrderPostDto;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.mapper.OrderMapper;
import com.seb_main_002.order.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/orders")
@Validated
public class OrderController {
    private OrderMapper mapper;
    private OrderService orderService;

    public OrderController(OrderMapper mapper,
                           OrderService orderService) {
        this.mapper = mapper;
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity postOrder(@Valid @RequestBody OrderPostDto orderPostDto) {
        Order order = mapper.orderPostDtoToOrder(orderPostDto);
        OrderInfoDto orderInfoDto = mapper.orderPostDtoToOrderInfo(orderPostDto);

        orderService.createOrder(order, orderInfoDto);

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
