package com.seb_main_002.cart.service;

import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CartService {


    private final MemberRepository memberRepository;

    public CartService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void updateCart(CartItem cartItem){
        //cartId와 memberId는 같으므로 cartId의 값으로 member를 찾는다.
        Member member = findVerifiedMember(cartItem.getCart().getCartId());

        Cart cart = member.getCart();
        cart.setCartItems(cartItem);
        member.setCart(cart);

        memberRepository.save(member);

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
}
