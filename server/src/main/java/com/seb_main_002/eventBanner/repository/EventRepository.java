package com.seb_main_002.eventBanner.repository;

import com.seb_main_002.eventBanner.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
