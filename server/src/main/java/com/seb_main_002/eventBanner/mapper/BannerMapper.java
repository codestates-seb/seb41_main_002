package com.seb_main_002.eventBanner.mapper;

import com.seb_main_002.eventBanner.dto.BannerResponseDto;
import com.seb_main_002.eventBanner.entity.Banner;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BannerMapper {
    BannerResponseDto bannerToBannerResponseDto(Banner banner);
}
