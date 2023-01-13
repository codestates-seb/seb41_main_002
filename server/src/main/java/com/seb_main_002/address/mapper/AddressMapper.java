package com.seb_main_002.address.mapper;

import com.seb_main_002.address.dto.AddressPostDto;
import com.seb_main_002.address.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address addressPostDtoToAddress(AddressPostDto addressPostDto);
}
