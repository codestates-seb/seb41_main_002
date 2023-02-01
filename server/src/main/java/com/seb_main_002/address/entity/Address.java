package com.seb_main_002.address.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Address extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String addressTitle;

    private String address;

    private Boolean isPrimary;

    private String zipcode;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
