package com.seb_main_002.eventBanner.repository;

import com.seb_main_002.eventBanner.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, Long> {

}
