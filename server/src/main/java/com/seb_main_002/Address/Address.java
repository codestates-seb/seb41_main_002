package com.seb_main_002.Address;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.member.entity.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Address extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String title;

    private String address;

    private Boolean isPrimary;

    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}
