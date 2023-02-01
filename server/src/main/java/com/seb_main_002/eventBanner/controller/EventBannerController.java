package com.seb_main_002.eventBanner.controller;

import com.seb_main_002.eventBanner.dto.EventPatchDto;
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
    public ResponseEntity postEventImage(@RequestPart(value = "eventTitleImage") MultipartFile eventTitleImage,
                                         @RequestPart(value = "eventContentImage") MultipartFile eventContentImage,
                                         @RequestPart(value = "eventPostDto") @Valid EventPostDto eventPostDto) throws IOException {
        Event event = eventMapper.eventPostDtoToEvent(eventPostDto);

        event.setEventTitleImageUrl(eventBannerService.uploadImage(eventTitleImage.getInputStream(),
                eventTitleImage.getOriginalFilename(),
                eventTitleImage.getSize()));

        event.setEventContentImageUrl(eventBannerService.uploadImage(eventContentImage.getInputStream(),
                eventContentImage.getOriginalFilename(),
                eventContentImage.getSize()));

        Event response = eventBannerService.createEvent(event);

        return new ResponseEntity<>(eventMapper.eventToEventResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/event/{eventId}")
    public ResponseEntity patchEventImage(@PathVariable("eventId") Long eventId,
                                          @RequestPart(value = "eventTitleImage") MultipartFile eventTitleImage,
                                          @RequestPart(value = "eventContentImage") MultipartFile eventContentImage,
                                          @RequestPart(value = "eventPatchDto") EventPatchDto eventPatchDto) throws IOException {
        Event event = eventMapper.eventPatchDtoToEvent(eventPatchDto);
        event.setEventId(eventId);

        if(!eventTitleImage.getOriginalFilename().equals("")) {
            event.setEventTitleImageUrl(eventBannerService.uploadImage(eventTitleImage.getInputStream(),
                    eventTitleImage.getOriginalFilename(),
                    eventTitleImage.getSize()));
        }

        if(!eventContentImage.getOriginalFilename().equals("")) {
            event.setEventContentImageUrl(eventBannerService.uploadImage(eventContentImage.getInputStream(),
                    eventContentImage.getOriginalFilename(),
                    eventContentImage.getSize()));
        }

        Event response = eventBannerService.updateEvent(event);

        return new ResponseEntity<>(eventMapper.eventToEventResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("event/{eventId}")
    public ResponseEntity getEvent(@PathVariable Long eventId){

        Event response = eventBannerService.findEvent(eventId);

        return new ResponseEntity(eventMapper.eventToEventResponseDto(response), HttpStatus.OK);
    }

}
