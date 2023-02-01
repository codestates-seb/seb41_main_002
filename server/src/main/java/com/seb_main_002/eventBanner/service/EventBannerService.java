package com.seb_main_002.eventBanner.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb_main_002.eventBanner.entity.Banner;
import com.seb_main_002.eventBanner.entity.Event;
import com.seb_main_002.eventBanner.repository.BannerRepository;
import com.seb_main_002.eventBanner.repository.EventRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class EventBannerService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final BannerRepository bannerRepository;
    private final EventRepository eventRepository;

    public EventBannerService(AmazonS3 amazonS3, BannerRepository bannerRepository, EventRepository eventRepository) {
        this.amazonS3 = amazonS3;
        this.bannerRepository = bannerRepository;
        this.eventRepository = eventRepository;
    }

    public Banner createBanner(Banner banner){
        return bannerRepository.save(banner);
    }

    public Event createEvent(Event event){
        return eventRepository.save(event);
    }

    public Event findEvent(long eventId){
        return findVerifiedEvent(eventId);
    }

    public Event updateEvent(Event event){
        Event verifiedEvent = findVerifiedEvent(event.getEventId());

        Optional.ofNullable(event.getTitle()).ifPresent(eventTitle -> verifiedEvent.setTitle(eventTitle));
        Optional.ofNullable(event.getContent()).ifPresent(eventContent -> verifiedEvent.setContent(eventContent));
        Optional.ofNullable(event.getEndAt()).ifPresent(eventEndAt -> verifiedEvent.setEndAt(eventEndAt));
        Optional.ofNullable(event.getEventTitleImageUrl()).ifPresent(eventTitleImageUrl -> verifiedEvent.setEventTitleImageUrl(eventTitleImageUrl));
        Optional.ofNullable(event.getEventContentImageUrl()).ifPresent(eventContentImageUrl -> verifiedEvent.setEventContentImageUrl(eventContentImageUrl));

        return eventRepository.save(verifiedEvent);
    }

    public Event findVerifiedEvent(long eventId){
        Optional<Event> optionalEvent = eventRepository.findById(eventId);

        return optionalEvent.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.EVENT_NOT_FOUND));
    }

    public String uploadImage(InputStream input, String fileName, long fileSize) throws IOException {
        String s3FileName = UUID.randomUUID()+"-"+ fileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(fileSize);

        amazonS3.putObject(bucket, s3FileName, input, objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

}
