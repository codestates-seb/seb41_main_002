package com.seb_main_002.eventImage.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb_main_002.eventImage.entity.Banner;
import com.seb_main_002.eventImage.entity.Event;
import com.seb_main_002.eventImage.repository.BannerRepository;
import com.seb_main_002.eventImage.repository.EventRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@Transactional
public class EventImageService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final BannerRepository bannerRepository;
    private final EventRepository eventRepository;

    public EventImageService(AmazonS3 amazonS3, BannerRepository bannerRepository, EventRepository eventRepository) {
        this.amazonS3 = amazonS3;
        this.bannerRepository = bannerRepository;
        this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event){
        return eventRepository.save(event);
    }

    public Banner createBanner(Banner banner){
        return bannerRepository.save(banner);
    }

    public String uploadImage(InputStream input, String fileName, long fileSize) throws IOException {
        String s3FileName = UUID.randomUUID()+"-"+ fileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(fileSize);

        amazonS3.putObject(bucket, s3FileName, input, objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

}
