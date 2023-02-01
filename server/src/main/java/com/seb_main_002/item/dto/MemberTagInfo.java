package com.seb_main_002.item.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class MemberTagInfo{
    private List<String> memberTagsList;
}