package com.seb_main_002.home.service;

import com.seb_main_002.eventBanner.entity.Banner;
import com.seb_main_002.eventBanner.entity.Event;
import com.seb_main_002.eventBanner.repository.BannerRepository;
import com.seb_main_002.eventBanner.repository.EventRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class HomeService {

    private BannerRepository bannerRepository;
    private EventRepository eventRepository;
    private ItemRepository itemRepository;

    public HomeService(BannerRepository bannerRepository,
                       EventRepository eventRepository,
                       ItemRepository itemRepository) {
        this.bannerRepository = bannerRepository;
        this.eventRepository = eventRepository;
        this.itemRepository = itemRepository;
    }

    public String findBannerImageUrl() {
        final Long bannerImageId = (long)1;
        Banner banner = verifyBannerImage(bannerImageId);
        return banner.getBannerImageUrl();
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

    private Banner verifyBannerImage(Long bannerImageId) {
        Optional<Banner> optionalBannerImage = bannerRepository.findById(bannerImageId);
        return optionalBannerImage.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BANNER_IMAGE_NOT_FOUND)
        );
    }

}
