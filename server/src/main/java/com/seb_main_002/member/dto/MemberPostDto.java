package com.seb_main_002.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;

@Getter
@Builder
public class MemberPostDto {
    private String accountId;
    private String password;
    private String memberName;
    private String birthDate;

    @Email
    private String email;

    private String phoneNumber;

}
