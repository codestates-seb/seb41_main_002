package com.seb_main_002.address.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressPatchDto {
    private Boolean isPrimary;

    private String addressTitle;

    private String zipcode;

    private String address;
}
