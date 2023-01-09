package com.seb_main_002.member.entity;

import com.seb_main_002.Address.Address;
import com.seb_main_002.audit.Auditable;
import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String name;
    private String accountId;
    private String password;
    private String email;
    private String birthdate;

    @OneToMany
    @JoinColumn(name = "ADDRESS_ID")
    private List<Address> addressList = new ArrayList<>();

    private String phoneNumber;

    @ElementCollection
    private List<String> tagList = new ArrayList<>();

    private Integer memberReserve;

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = {CascadeType.ALL} )
    private Cart cart;

    @OneToOne(mappedBy = "member", cascade = {CascadeType.ALL})
    private Subscribe subscribe;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<Order> orders = new ArrayList<>();

    public void setReviews(Review review) {
        this.reviews.add(review);
        if(review.getMember() != this) {
            review.setMember(this);
        }
    }

    public void setSubscribe(Subscribe subscribe) {
        this.setSubscribe(subscribe);
        if(subscribe.getMember() != this) {
            subscribe.setMember(this);
        }
    }

    public void setCart(Cart cart) {
        this.setCart(cart);
        if(cart.getMember() != this) {
            cart.setMember(this);
        }
    }

    public void setOrders(Order order) {
        this.orders.add(order);
        if(order.getMember() != this) {
            order.setMember(this);
        }
    }

}
