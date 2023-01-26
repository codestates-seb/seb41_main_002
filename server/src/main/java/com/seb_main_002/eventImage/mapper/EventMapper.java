package com.seb_main_002.eventImage.mapper;

import com.seb_main_002.eventImage.dto.EventPostDto;
import com.seb_main_002.eventImage.entity.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
    Event eventPostDtoToEvent(EventPostDto eventPostDto);
}
