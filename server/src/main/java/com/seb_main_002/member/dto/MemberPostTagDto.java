package com.seb_main_002.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MemberPostTagDto {
    private List<String> tagList;
}
