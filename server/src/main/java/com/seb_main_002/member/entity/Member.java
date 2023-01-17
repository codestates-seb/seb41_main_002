package com.seb_main_002.member.entity;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.audit.Auditable;
import com.seb_main_002.cart.entity.Cart;
import com.seb_main_002.order.entity.Order;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String name;

    @Column(unique = true)
    private String accountId;

    private String password;

    @Column(unique = true)
    private String email;

    private String birthdate;

    @OneToMany(mappedBy = "member")
    private List<Address> addressList = new ArrayList<>();

    private String phoneNumber;

    @ElementCollection
    private List<String> tagList = new ArrayList<>();
    @ColumnDefault("0")
    private Integer memberReserve;

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = {CascadeType.ALL} )
    private Cart cart;

    @OneToOne(mappedBy = "member", cascade = {CascadeType.ALL})
    private Subscribe subscribe;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.ALL})
    private List<Order> orders = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public enum memberRole{
        ROLE_USER,
        ROLE_ADMIN
    }

    public void setReviews(Review review) {
        this.reviews.add(review);
        if(review.getMember() != this) {
            review.setMember(this);
        }
    }

    public void setSubscribe(Subscribe subscribe) {
        this.subscribe = subscribe;
        if(subscribe.getMember() != this) {
            subscribe.setMember(this);
        }
    }

    public void setCart(Cart cart) {
        this.cart = cart;
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
