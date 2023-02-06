package com.seb_main_002.order.controller;

import com.seb_main_002.order.dto.OrderInfoDto;
import com.seb_main_002.order.dto.OrderPostDto;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.order.mapper.OrderMapper;
import com.seb_main_002.order.service.OrderService;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@Validated
public class OrderController {
    private OrderMapper mapper;
    private OrderService orderService;
    private final JwtVerificationFilter jwtVerificationFilter;

    public OrderController(OrderMapper mapper,
                           OrderService orderService,
                           JwtVerificationFilter jwtVerificationFilter) {
        this.mapper = mapper;
        this.orderService = orderService;
        this.jwtVerificationFilter = jwtVerificationFilter;
    }

    @PostMapping
    public ResponseEntity postOrder(@Valid @RequestBody OrderPostDto orderPostDto,
                                    HttpServletRequest request) {

        Map<String, Object> response = jwtVerificationFilter.verifyJws(request);
        Long tokenMemberId = ((Number)response.get("memberId")).longValue();

        Order order = mapper.orderPostDtoToOrder(orderPostDto);
        OrderInfoDto orderInfoDto = mapper.orderPostDtoToOrderInfo(orderPostDto);

        orderService.createOrder(tokenMemberId, order, orderInfoDto);

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
