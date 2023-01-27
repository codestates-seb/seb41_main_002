package com.seb_main_002.eventImage.controller;


import com.seb_main_002.eventImage.dto.EventResponseDto;
import com.seb_main_002.eventImage.entity.Event;
import com.seb_main_002.eventImage.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;

@RequestMapping("api/v1/event")
@RestController
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{eventId}")
    public ResponseEntity getEvent(@PathVariable Long eventId){

        Event event = eventService.findEvent(eventId);

        EventResponseDto response = EventResponseDto.builder()
                .eventId(event.getEventId())
                .title(event.getTitle())
                .content(event.getContent())
                .createdAt(event.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm")))
                .endAt(event.getEndAt())
                .build();

        return new ResponseEntity(response, HttpStatus.OK);
    }

}
