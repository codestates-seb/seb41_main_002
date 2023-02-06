package com.seb_main_002.member.dto;

import lombok.Getter;

@Getter
public class SIDResponseDto {
    String SID;

    public SIDResponseDto(String SID) {
        this.SID = SID;
    }
}
