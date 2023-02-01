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

    //정기결제를 위한 결제아이디
    private String SID;
    private Boolean isSubscribed = false;
    private Integer sampleCount = 0;
    private LocalDateTime subscribedDate;
    private Integer totalDeliveryDiscount = 0;
    private Integer reserveProfit = 0;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
