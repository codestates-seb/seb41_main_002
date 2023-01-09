package com.seb_main_002.member.mapper;

import com.seb_main_002.member.dto.MemberPatchDto;
import com.seb_main_002.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member MemberPatchDtoToMember(MemberPatchDto memberPatchDto);
}
