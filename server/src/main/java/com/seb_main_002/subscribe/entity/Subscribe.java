package com.seb_main_002.subscribe.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.member.entity.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Subscribe extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscribeId;

    private Boolean isSubscribed;

    private Integer sampleCount;

    private Integer totalDeliveryDiscount;

    private Integer reserveProfit;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
