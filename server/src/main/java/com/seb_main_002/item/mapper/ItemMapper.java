package com.seb_main_002.item.mapper;

import com.seb_main_002.item.dto.ItemPostDto;
import com.seb_main_002.item.entity.Item;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    Item itemPostDtoToItem(ItemPostDto itemPostDto);
}
