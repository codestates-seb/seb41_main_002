package com.seb_main_002.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;

@Getter
public class MemberMailRequestDto {
    private String accountId;
    @Email
    private String email;
}
