package com.seb_main_002.cart.repository;

import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    public void deleteAllByCart(Cart cart);

}
