package com.seb_main_002.eventImage.service;

import com.seb_main_002.eventImage.entity.Event;
import com.seb_main_002.eventImage.repository.EventRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event findEvent(long eventId){
        return findVerifiedEvent(eventId);
    }

    public Event findVerifiedEvent(long eventId){
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        Event findEvent = optionalEvent.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.EVENT_NOT_FOUND));

        return findEvent;
    }
}
