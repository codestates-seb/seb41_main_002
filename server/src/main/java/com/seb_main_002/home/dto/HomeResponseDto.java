package com.seb_main_002.home.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class HomeResponseDto {
    private String bannerImageURL;

    private List<EventInfo> eventsInfo;

    private List<TopRankBanner> topRankBanners;

    @Getter
    @Builder
    public static class EventInfo {
        private Long eventId;

        private String title;

        private String eventTitleImageURL;

        private String eventContentImageURL;

        private String createdAt;

        private String endAt;
    }

    @Getter
    @Builder
    public static class TopRankBanner {
        private String categoryKRName;

        private String categoryENName;

        private String topListURL;
    }
}
