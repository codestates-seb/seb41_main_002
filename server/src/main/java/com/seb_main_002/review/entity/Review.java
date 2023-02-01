package com.seb_main_002.review.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.member.entity.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String reviewTitle;

    private String reviewContent;

    private Double reviewRating;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

}
