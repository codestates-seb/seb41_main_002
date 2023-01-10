package com.seb_main_002.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberPatchDto {
    private String memberName;
    private String email;
    private String phoneNumber;
    private List<String> tagList;
    private Boolean isSubscribed;
}
