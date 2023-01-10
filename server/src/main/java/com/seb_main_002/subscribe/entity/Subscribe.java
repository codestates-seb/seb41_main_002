package com.seb_main_002.subscribe.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Subscribe extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscribeId;

    @ColumnDefault("false")
    private Boolean isSubscribed;
    @ColumnDefault("0")
    private Integer sampleCount;
    private LocalDateTime subScribedDate;
    @ColumnDefault("0")
    private Integer totalDeliveryDiscount;
    @ColumnDefault("0")
    private Integer reserveProfit;
    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
