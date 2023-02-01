package com.seb_main_002.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Builder
public class MemberPostDto {
    @NotBlank
    @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$")
    private String accountId;

    @NotBlank
    private String password;


    @Pattern(regexp = "^\\S+(\\s?\\S+)*$", message = "회원 이름은 공백이 아니어야 합니다.")
    private String memberName;


    @Pattern(regexp ="\\d{4}/(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])")
    private String birthDate;

    @Email
    private String email;

    @Pattern(regexp = "^010-\\d{4}-\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
    private String phoneNumber;

}
