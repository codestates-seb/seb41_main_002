package com.seb_main_002.eventImage.controller;

import com.seb_main_002.eventImage.dto.EventPostDto;
import com.seb_main_002.eventImage.entity.Banner;
import com.seb_main_002.eventImage.entity.Event;
import com.seb_main_002.eventImage.mapper.EventMapper;
import com.seb_main_002.eventImage.service.EventImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/image")
public class EventImageController_D {
    private final EventImageService eventImageService;
    private final EventMapper mapper;

    EventImageController_D(EventImageService eventImageService, EventMapper mapper) {
        this.eventImageService = eventImageService;
        this.mapper = mapper;
    }

    @PostMapping("/banner")
    public ResponseEntity postBannerImage(@RequestPart(value = "bannerImage") MultipartFile bannerImage) throws IOException {
        Banner banner = new Banner();
        banner.setBannerImageUrl(eventImageService.uploadImage(bannerImage.getInputStream(),
                bannerImage.getOriginalFilename(),
                bannerImage.getSize()));
        eventImageService.createBanner(banner);

        return new ResponseEntity<>(banner, HttpStatus.OK);
    }

    @PostMapping("/event")
    public ResponseEntity postEventImage(@RequestPart(value = "eventPostDto") EventPostDto eventPostDto,
                                         @RequestPart(value = "eventImage") MultipartFile eventImage) throws IOException {
        Event event = mapper.eventPostDtoToEvent(eventPostDto);

        event.setEventImageUrl(eventImageService.uploadImage(eventImage.getInputStream(),
                eventImage.getOriginalFilename(),
                eventImage.getSize()));

        return new ResponseEntity<>(eventImageService.createEvent(event), HttpStatus.OK);
    }

    // todo get event 추가할지도?
}
