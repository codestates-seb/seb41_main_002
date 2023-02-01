package com.seb_main_002.item.mapper;

import com.seb_main_002.item.dto.*;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.review.entity.Review;
import org.mapstruct.Mapper;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    Item itemPostDtoToItem(ItemPostDto itemPostDto);

    default ItemTopListResponseDto itemsToItemTopListResponseDto(List<Item> items, List<String> memberTagList){
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

        MemberTagInfo memberTagInfo = MemberTagInfo.builder()
                .memberTagsList(memberTagList)
                .build();

        ItemTopListResponseDto itemTopListResponseDto = ItemTopListResponseDto.builder()
                .topList(topItemDtos)
                .member(memberTagInfo)
                .build();

        return itemTopListResponseDto;
    }

    default ItemSearchResponseDto itemsToItemSearchResponseDto(List<Item> items, List<String> memberTagList){
        List<ItemSearchResponseDto.SearchItemDto> searchItemDtos = items.stream()
                .map(item -> ItemSearchResponseDto.SearchItemDto.builder()
                        .itemId(item.getItemId())
                        .itemTitle(item.getItemTitle())
                        .categoryKRName(item.getCategoryKRName())
                        .categoryENName(item.getCategoryENName())
                        .titleImageURL(item.getTitleImageUrl())
                        .price(item.getPrice())
                        .tagsList(item.getTagList())
                        .build())
                .collect(Collectors.toList());

        MemberTagInfo memberTagInfo = MemberTagInfo.builder()
                .memberTagsList(memberTagList)
                .build();

        ItemSearchResponseDto itemSearchResponseDto = ItemSearchResponseDto.builder()
                .cosmetics(searchItemDtos)
                .member(memberTagInfo)
                .build();

        return itemSearchResponseDto;
    }

    default ItemSimpleResponseDto itemToItemSimpleResponseDto(Item item){
        List<Review> reivews = item.getReviews();

        ItemSimpleResponseDto.ItemInfo itemInfo = ItemSimpleResponseDto.ItemInfo.builder()
                .itemId(item.getItemId())
                .itemTitle(item.getItemTitle())
                .categoryKRName(item.getCategoryKRName())
                .titleImageURL(item.getTitleImageUrl())
                .contentImageURL(item.getContentImageUrl())
                .content(item.getContent())
                .price(item.getPrice())
                .tagList(item.getTagList())
                .rating(item.getRating())
                .build();

        List<ItemSimpleResponseDto.ItemReviewResponseDto> responseReviews = reivews.stream()
                .map(review -> ItemSimpleResponseDto.ItemReviewResponseDto.builder()
                        .memberId(review.getMember().getMemberId())
                        .accountId(review.getMember().getAccountId())
                        .reviewId(review.getReviewId())
                        .reviewTitle(review.getReviewTitle())
                        .reviewContent(review.getReviewContent())
                        .createdAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm")))
                        .modifiedAt(review.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm")))
                        .reviewRating(review.getReviewRating())
                        .build())
                .collect(Collectors.toList());

        ItemSimpleResponseDto itemSimpleResponseDto = ItemSimpleResponseDto.builder()
                .itemInfo(itemInfo)
                .reviews(responseReviews)
                .build();

        return itemSimpleResponseDto;
    }
}
