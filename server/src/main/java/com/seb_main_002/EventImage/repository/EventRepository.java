package com.seb_main_002.EventImage.repository;

import com.seb_main_002.EventImage.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
