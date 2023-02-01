package com.seb_main_002.cart.entity;


import com.seb_main_002.audit.Auditable;
import com.seb_main_002.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @OneToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "cart", cascade = {CascadeType.ALL})
    private List<CartItem> cartItems = new ArrayList<>();

    public void setCartItems(CartItem cartItem){
        this.cartItems.add(cartItem);
        if(cartItem.getCart() != this){
            cartItem.setCart(this);
        }
    }
}
