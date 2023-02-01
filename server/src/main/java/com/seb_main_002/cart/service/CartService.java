package com.seb_main_002.cart.service;

import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.cart.repository.CartItemRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CartService {


    private final MemberRepository memberRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(MemberRepository memberRepository, CartItemRepository cartItemRepository) {
        this.memberRepository = memberRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public void updateCart(CartItem cartItem){
        //cartId와 memberId는 같으므로 cartId의 값으로 member를 찾는다.
        Member member = findVerifiedMember(cartItem.getCart().getCartId());

        Cart cart = member.getCart();
        cart.setCartItems(cartItem);
        member.setCart(cart);

        memberRepository.save(member);

    }

    public void updateCartItemCount(long memberId, long cartItemId, int itemCountChange){
        //변화감지를 통한 자동 db변경
        Member member = findVerifiedMember(memberId);
        Cart cart= member.getCart();
        Integer itemCount;

        Optional<CartItem> optionalCartItem = cart.getCartItems().stream()
                .filter(ci -> ci.getCartItemId() == cartItemId).findAny();

        CartItem cartItem = optionalCartItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_ITEM_NOT_FOUND));

        itemCount = cartItem.getItemCount() + itemCountChange;
        if(itemCount < 1) itemCount = 1;

        cartItem.setItemCount(itemCount);
        cartItem.setItemTotalPrice(cartItem.getItem().getPrice() * cartItem.getItemCount());
    }


    public void deleteCartItems(long memberId){
        Member member = findVerifiedMember(memberId);

        Cart cart= member.getCart();

        cartItemRepository.deleteAllByCart(cart);
    }

    public void deleteCartItem(long cartItemId){
        CartItem cartItem = findVerifiedCartItem(cartItemId);
        cartItemRepository.delete(cartItem);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional
    public CartItem findVerifiedCartItem(long cartItemId){
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);
        CartItem findCartItem = optionalCartItem.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.CART_ITEM_NOT_FOUND));
        return findCartItem;
    }
}
