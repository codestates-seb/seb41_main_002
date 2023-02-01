package com.seb_main_002.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class PasswordEditRequestDto {

    @NotBlank
    private String oldPassword;
    @NotBlank
    private String newPassword;
}
