package com.seb_main_002.home.service;

import com.seb_main_002.EventImage.entity.BannerImage;
import com.seb_main_002.EventImage.entity.Event;
import com.seb_main_002.EventImage.repository.BannerImageRepository;
import com.seb_main_002.EventImage.repository.EventRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HomeService {

    private BannerImageRepository bannerImageRepository;
    private EventRepository eventRepository;
    private ItemRepository itemRepository;

    public HomeService(BannerImageRepository bannerImageRepository,
                       EventRepository eventRepository,
                       ItemRepository itemRepository) {
        this.bannerImageRepository = bannerImageRepository;
        this.eventRepository = eventRepository;
        this.itemRepository = itemRepository;
    }

    public String findBannerImageUrl() {
        final Long bannerImageId = (long)1;
        BannerImage bannerImage = verifyBannerImage(bannerImageId);
        return bannerImage.getBannerImageUrl();
    }

    public List<Event> findEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(event -> {
            if(event.getEventStatus().equals(Event.EventStatus.EVENT_PROGRESS)) events.add(event);
        });
        return events;

    }

    public List<Item> findItemsSortedSalesCount() {
        final int topRankingLimit = 5;
        List<Item> items = itemRepository.findAll(Sort.by(Sort.Direction.DESC, "salesCount"));
        return items.subList(0, topRankingLimit);

    }

    private BannerImage verifyBannerImage(Long bannerImageId) {
        Optional<BannerImage> optionalBannerImage = bannerImageRepository.findById(bannerImageId);
        return optionalBannerImage.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BANNER_IMAGE_NOT_FOUND)
        );
    }

}
