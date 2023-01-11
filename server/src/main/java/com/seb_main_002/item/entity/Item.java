package com.seb_main_002.item.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.cart.entity.CartItem;
import com.seb_main_002.order.entity.OrderItem;
import com.seb_main_002.review.entity.Review;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private String itemTitle;

    @ElementCollection
    List<String> tagList = new ArrayList<>();
    private Integer price;
    private String contentImageUrl;

    @Column(length = 65535)
    private String content;
    private String titleImageUrl;
    private Double rating;
    private Integer salesCount;
    private String categoryKRName;
    private String categoryENName;

    @OneToMany(mappedBy = "item",cascade = {CascadeType.ALL})
    private List<Review> reviews = new ArrayList<>();


    @OneToMany(mappedBy = "item",cascade = {CascadeType.ALL})
    private List<CartItem> cartItems = new ArrayList<>();


    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems = new ArrayList<>();

    public void setReviews(Review review){
        this.reviews.add(review);
        if(review.getItem() != this){
            review.setItem(this);
        }
    }
    public void setCartItems(CartItem cartitem){
        this.cartItems.add(cartitem);
        if(cartitem.getItem() != this){
            cartitem.setItem(this);
        }
    }

}
