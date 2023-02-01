package com.seb_main_002.address.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
public class AddressPostDto {
    @Positive
    private Long memberId;

    private Boolean isPrimary;

    @NotBlank(message = "주소지 이름은 공백이 아니어야 합니다.")
    private String addressTitle;

    @NotBlank(message = "우편번호는 공백이 아니어야 합니다.")
    private String zipcode;

    @NotBlank(message = "주소는 공백이 아니어야 합니다.")
    private String address;
}
