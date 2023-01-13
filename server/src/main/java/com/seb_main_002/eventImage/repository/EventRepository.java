package com.seb_main_002.eventImage.repository;

import com.seb_main_002.eventImage.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
