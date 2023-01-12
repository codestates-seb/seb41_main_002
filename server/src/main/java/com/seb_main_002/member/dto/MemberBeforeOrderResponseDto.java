package com.seb_main_002.member.dto;

import com.seb_main_002.member.dto.MemberBeforeEditResponseDto.AddressDetailResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberBeforeOrderResponseDto {
    private Boolean isSubscribed;
    private Integer memberReserve;
    private List<AddressDetailResponseDto> addressList;
}
