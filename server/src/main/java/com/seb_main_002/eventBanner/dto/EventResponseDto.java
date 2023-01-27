package com.seb_main_002.eventBanner.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EventResponseDto{
    private Long eventId;

    private String title;

    private String content;

    private String eventImageURL;

    private String createdAt;

    private String endAt;
}
