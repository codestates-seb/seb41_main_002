package com.seb_main_002.home.controller;

import com.seb_main_002.home.dto.HomeResponseDto;
import com.seb_main_002.home.service.HomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/home")
public class HomeController {
    private HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping
    public ResponseEntity getHomeInfo() {
        HomeResponseDto homeResponseDto = HomeResponseDto.builder()
                .bannerImageURL(homeService.findBannerImageUrl())
                .eventsInfo(homeService.findEvents().stream().map(event -> {
                    return HomeResponseDto.EventInfo.builder()
                            .eventId(event.getEventId())
                            .title(event.getTitle())
                            .eventImageURL(event.getEventImageUrl())
                            .createdAt(event.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .endAt(event.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")))
                            .build();
                }).collect(Collectors.toList()))
                .topRankBanners(homeService.findItemsSortedSalesCountByCategory().stream().map(item -> {
                    return HomeResponseDto.TopRankBanner.builder()
                            .categoryKRName(item.getCategoryKRName())
                            .categoryENName(item.getCategoryENName())
                            .topListURL(item.getTitleImageUrl())
                            .build();
                }).collect(Collectors.toList()))
                .build();

        return new ResponseEntity<>(homeResponseDto, HttpStatus.OK);
    }
}
