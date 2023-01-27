package com.seb_main_002.eventBanner.mapper;

import com.seb_main_002.eventBanner.dto.EventPostDto;
import com.seb_main_002.eventBanner.entity.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
    Event eventPostDtoToEvent(EventPostDto eventPostDto);
}
