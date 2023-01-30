package com.seb_main_002.eventBanner.mapper;

import com.seb_main_002.eventBanner.dto.EventPostDto;
import com.seb_main_002.eventBanner.dto.EventResponseDto;
import com.seb_main_002.eventBanner.entity.Event;
import org.mapstruct.Mapper;

import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface EventMapper {
    Event eventPostDtoToEvent(EventPostDto eventPostDto);
    default EventResponseDto eventToEventResponseDto(Event event) {
        return EventResponseDto.builder()
                .eventId(event.getEventId())
                .title(event.getTitle())
                .content(event.getContent())
                .eventTitleImageURL(event.getEventTitleImageUrl())
                .eventContentImageURL(event.getEventContentImageUrl())
                .createdAt(event.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm")))
                .endAt(event.getEndAt())
                .build();
    }
}
