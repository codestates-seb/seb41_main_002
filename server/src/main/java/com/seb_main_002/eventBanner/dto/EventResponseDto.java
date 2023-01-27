package com.seb_main_002.eventImage.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EventResponseDto{

    Long eventId;
    String title;
    String content;
    String eventImageURL;
    String createdAt;
    String endAt;
}
