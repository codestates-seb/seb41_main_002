package com.seb_main_002.cart.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.item.entity.Item;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CartItem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    @ManyToOne
    @JoinColumn(name = "CART_ID")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @Column(nullable = false)
    private Integer itemCount = 1;

    @Column(nullable = false)
    private Integer itemTotalPrice = 0;


}
