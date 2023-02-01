package com.seb_main_002.eventBanner.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BannerResponseDto {
    private Long bannerId;

    private String bannerImageUrl;
}
