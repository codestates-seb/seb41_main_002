package com.seb_main_002.item.controller;

import com.seb_main_002.item.dto.ItemPostDto;
import com.seb_main_002.item.dto.ItemTopListResponseDto;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.mapper.ItemMapper;
import com.seb_main_002.item.service.ItemService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper mapper;

    public ItemController(ItemService itemService, ItemMapper mapper) {
        this.itemService = itemService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postItem(@RequestPart(value = "titleImage") MultipartFile titleImage,
                                   @RequestPart(value = "contentImage") MultipartFile contentImage,
                                   @RequestPart(value = "itemPostDto") ItemPostDto itemPostDto) throws IOException {
        Item item = mapper.itemPostDtoToItem(itemPostDto);

        item.setTitleImageUrl(itemService.uploadImage(titleImage.getInputStream(),
                titleImage.getOriginalFilename(),
                titleImage.getSize()));

        item.setContentImageUrl(itemService.uploadImage(contentImage.getInputStream(),
                contentImage.getOriginalFilename(),
                contentImage.getSize()));

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(createdItem,HttpStatus.CREATED);
    }


    @GetMapping("/toplist/{categoryENName}")
    public ResponseEntity getItems(@PathVariable("categoryENName") String categoryENName){

        List<Item> items = itemService.findTopListItems(categoryENName);
        List<ItemTopListResponseDto.TopItemDto> topItemDtos = items.stream()
                .map(item -> ItemTopListResponseDto.TopItemDto.builder()
                        .itemId(item.getItemId())
                        .itemTitle(item.getItemTitle())
                        .categoryKRName(item.getCategoryKRName())
                        .categoryENName(item.getCategoryENName())
                        .titleImageURL(item.getTitleImageUrl())
                        .price(item.getPrice())
                        .salesCount(item.getSalesCount())
                        .tagsList(item.getTagList())
                        .build())
                .collect(Collectors.toList());

        ItemTopListResponseDto response = ItemTopListResponseDto.builder()
                .topList(topItemDtos)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }


}
