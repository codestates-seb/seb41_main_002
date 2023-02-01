package com.seb_main_002.eventBanner.repository;

import com.seb_main_002.eventBanner.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query(value = "SELECT * FROM banner ORDER BY banner_id DESC LIMIT 1", nativeQuery = true)
    Optional<Banner> findLatestBanner();

}
