package com.seb_main_002.cart.controller;

import com.seb_main_002.cart.dto.CartAddDto;
import com.seb_main_002.cart.dto.CartPatchDto2;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.cart.service.CartService;
import com.seb_main_002.cart.mapper.CartMapper;
import com.seb_main_002.item.service.ItemService;
import com.seb_main_002.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
public class CartController {

    private final CartService cartService;
    private final MemberService memberService;
    private final ItemService itemService;
    private final CartMapper mapper;

    public CartController(CartService cartService, MemberService memberService, ItemService itemService, CartMapper mapper) {
        this.cartService = cartService;
        this.memberService = memberService;
        this.itemService = itemService;
        this.mapper = mapper;
    }

    @PatchMapping("/{memberId}/carts")
    public ResponseEntity addCartItem(@PathVariable("memberId") Long memberId,
                                      @RequestBody CartAddDto cartAddDto){

        CartItem cartItem = mapper.cartAddDtoToCartItem(cartAddDto);

        //cartId와 memberId는 같으므로 memberId값을 cartId에 저장한다.
        cartItem.getCart().setCartId(memberId);

        cartService.updateCart(cartItem);


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{memberId}/carts/{cartItemId}")
    public ResponseEntity changeCartItemCount(@PathVariable("memberId") Long memberId,
                                              @RequestBody CartPatchDto2 cartPatchDto2){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{memberId}/carts")
    public ResponseEntity getCart(@PathVariable("memberId") Long memberId){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}/carts")
    public ResponseEntity deleteCart(@PathVariable("memberId") Long memberId){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
