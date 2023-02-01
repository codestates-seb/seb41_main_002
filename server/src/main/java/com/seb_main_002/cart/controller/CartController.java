package com.seb_main_002.cart.controller;

import com.seb_main_002.cart.dto.CartAddDto;
import com.seb_main_002.cart.dto.CartItemCountChangeDto;
import com.seb_main_002.cart.dto.CartResponseDto;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.cart.repository.CartItemRepository;
import com.seb_main_002.cart.service.CartService;
import com.seb_main_002.cart.mapper.CartMapper;
import com.seb_main_002.item.service.ItemService;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/v1/members")
@Validated
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
                                      @RequestBody @Valid CartAddDto cartAddDto){

        CartItem cartItem = mapper.cartAddDtoToCartItem(cartAddDto);

        //cartId와 memberId는 같으므로 memberId값을 cartId에 저장한다.
        cartItem.getCart().setCartId(memberId);

        cartService.updateCart(cartItem);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{memberId}/carts/{cartItemId}")
    public ResponseEntity changeCartItemCount(@PathVariable("memberId") Long memberId, @PathVariable("cartItemId") Long cartItemId,
                                              @RequestBody @Valid CartItemCountChangeDto cartItemCountChangeDto){

        cartService.updateCartItemCount(memberId, cartItemId, cartItemCountChangeDto.getItemCountChange());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{memberId}/carts")
    public ResponseEntity getCart(@PathVariable("memberId") Long memberId){

        Member member = memberService.findMember(memberId);
        List<CartItem> cartItems = member.getCart().getCartItems();
        List<CartResponseDto.CartInfo> cartInfos = cartItems.stream()
                .map(cartItem -> CartResponseDto.CartInfo.builder()
                        .cartItemId(cartItem.getCartItemId())
                        .itemId(cartItem.getItem().getItemId())
                        .itemTitle(cartItem.getItem().getItemTitle())
                        .titleImageURL(cartItem.getItem().getTitleImageUrl())
                        .itemCount(cartItem.getItemCount())
                        .itemTotalPrice(cartItem.getItemTotalPrice())
                        .build())
                .collect(Collectors.toList());

        CartResponseDto response = CartResponseDto.builder()
                .isSubscribed(member.getSubscribe().getIsSubscribed())
                .memberReserve(member.getMemberReserve())
                .cart(cartInfos)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}/carts")
    public ResponseEntity deleteCarts(@PathVariable("memberId") Long memberId){
        cartService.deleteCartItems(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}/carts/{cartItemId}")
    public ResponseEntity deleteCart(@PathVariable("memberId") Long memberId,
                                     @PathVariable("cartItemId") Long cartItemId){
        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
