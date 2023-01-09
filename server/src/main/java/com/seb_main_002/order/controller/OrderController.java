package com.seb_main_002.order.entity.controller;

import com.seb_main_002.order.entity.dto.OrderPostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @PostMapping
    public ResponseEntity postOrder(@RequestBody OrderPostDto orderPostDto) {

        return new ResponseEntity<> (HttpStatus.OK);
    }
}
