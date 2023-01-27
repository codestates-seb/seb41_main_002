package com.seb_main_002.eventBanner.controller;

import com.seb_main_002.eventBanner.dto.EventPostDto;

import com.seb_main_002.eventBanner.entity.Banner;
import com.seb_main_002.eventBanner.entity.Event;
import com.seb_main_002.eventBanner.mapper.BannerMapper;
import com.seb_main_002.eventBanner.mapper.EventMapper;
import com.seb_main_002.eventBanner.service.EventBannerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@Validated
public class EventBannerController {
    private final EventBannerService eventBannerService;
    private final EventMapper eventMapper;
    private final BannerMapper bannerMapper;

    EventBannerController(EventBannerService eventBannerService,
                          EventMapper eventMapper,
                          BannerMapper bannerMapper) {
        this.eventBannerService = eventBannerService;
        this.eventMapper = eventMapper;
        this.bannerMapper = bannerMapper;
    }

    @PostMapping("/banner")
    public ResponseEntity postBannerImage(@RequestPart(value = "bannerImage") MultipartFile bannerImage) throws IOException {
        Banner banner = new Banner();

        banner.setBannerImageUrl(eventBannerService.uploadImage(bannerImage.getInputStream(),
                bannerImage.getOriginalFilename(),
                bannerImage.getSize()));

        Banner response = eventBannerService.createBanner(banner);

        return new ResponseEntity<>(bannerMapper.bannerToBannerResponseDto(response), HttpStatus.OK);
    }

    @PostMapping("/event")
    public ResponseEntity postEventImage(@RequestPart(value = "eventImage") MultipartFile eventImage,
                                         @RequestPart(value = "eventPostDto") @Valid EventPostDto eventPostDto) throws IOException {
        Event event = eventMapper.eventPostDtoToEvent(eventPostDto);

        event.setEventImageUrl(eventBannerService.uploadImage(eventImage.getInputStream(),
                eventImage.getOriginalFilename(),
                eventImage.getSize()));

        Event response = eventBannerService.createEvent(event);

        return new ResponseEntity<>(eventMapper.eventToEventResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("event/{eventId}")
    public ResponseEntity getEvent(@PathVariable Long eventId){

        Event response = eventBannerService.findEvent(eventId);

        return new ResponseEntity(eventMapper.eventToEventResponseDto(response), HttpStatus.OK);
    }

}
