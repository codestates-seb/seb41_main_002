package com.seb_main_002.cart.mapper;

import com.seb_main_002.cart.dto.CartAddDto;
import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.item.entity.Item;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    default CartItem cartAddDtoToCartItem(CartAddDto cartAddDto){
        Cart cart = new Cart();
        Item item = new Item();
        item.setItemId(cartAddDto.getItemId());

        CartItem cartItem = new CartItem();
        cartItem.setItem(item);
        cartItem.setCart(cart);
        cartItem.setItemCount(cartAddDto.getItemCount());
        cartItem.setItemTotalPrice(cartAddDto.getItemTotalPrice());


        return cartItem;
    }
}
