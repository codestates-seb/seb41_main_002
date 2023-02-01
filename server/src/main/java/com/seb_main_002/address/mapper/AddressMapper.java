package com.seb_main_002.address.mapper;

import com.seb_main_002.address.dto.AddressPatchDto;
import com.seb_main_002.address.dto.AddressPostDto;
import com.seb_main_002.address.entity.Address;
import com.seb_main_002.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    default Address addressPostDtoToAddress(AddressPostDto addressPostDto) {
        Address address = new Address();
        Member member = new Member();
        member.setMemberId(addressPostDto.getMemberId());

        address.setAddressTitle(addressPostDto.getAddressTitle());
        address.setAddress(addressPostDto.getAddress());
        address.setIsPrimary(addressPostDto.getIsPrimary());
        address.setZipcode(addressPostDto.getZipcode());
        address.setMember(member);

        return address;
    }

    Address addressPatchDtoToAddress(AddressPatchDto addressPatchDto);
}
