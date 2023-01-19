package com.seb_main_002.item.controller;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.dto.*;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.mapper.ItemMapper;
import com.seb_main_002.item.service.ItemService;
import com.seb_main_002.member.service.MemberService;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    private final ItemService itemService;
    private final MemberService memberService;
    private final ItemMapper mapper;

    private final JwtVerificationFilter jwtVerificationFilter;

    public ItemController(ItemService itemService, MemberService memberService, ItemMapper mapper, JwtVerificationFilter jwtVerificationFilter) {
        this.itemService = itemService;
        this.memberService = memberService;
        this.mapper = mapper;
        this.jwtVerificationFilter = jwtVerificationFilter;
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
    public ResponseEntity getTopItems(@PathVariable("categoryENName") String categoryENName,
                                      @RequestParam(required = false) Boolean custom,
                                      HttpServletRequest request){
        if(custom == null) custom = false;

        Boolean isLogin = true;
        //memberTagsList는 비로그인시 null값을 가짐.
        List<String> memberTagsList = null;

        //로그인했을경우 멤버 태그리스트 추출
        try {
            Map<String, Object> claims = jwtVerificationFilter.verifyJws(request);
            Long memberId = ((Number) claims.get("memberId")).longValue();
            memberTagsList = memberService.findMember(memberId).getTagList();
        }catch(NullPointerException e){
            isLogin = false;
        }

        //로그인안하고 custom = true로 요청을 보낸다면 예외발생
        if(!isLogin && custom) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        List<Item> items = itemService.findTopListItems(categoryENName,custom,memberTagsList);

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

        ItemSearchResponseDto.MemberTagInfo memberTagInfo = ItemSearchResponseDto.MemberTagInfo.builder()
                .memberTagsList(memberTagsList)
                .build();

        ItemTopListResponseDto response = ItemTopListResponseDto.builder()
                .topList(topItemDtos)
                .member(memberTagInfo)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{categoryENName}")
    public ResponseEntity getFilteredItems(@PathVariable("categoryENName") String categoryENName,
                                           @RequestParam(required = false) Boolean custom,
                                           @RequestParam(required = false) String title,
                                           @RequestParam @Positive int page,
                                           HttpServletRequest request){
        if(categoryENName.equals("all")) categoryENName = "";
        if(custom == null) custom = false;
        if(title == null) title = "";
        page -= 1;

        Boolean isLogin = true;
        //memberTagsList는 비로그인시 null값을 가짐.
        List<String> memberTagsList = null;

        //로그인했을경우 멤버 태그리스트 추출
        try {
            Map<String, Object> claims = jwtVerificationFilter.verifyJws(request);
            Long memberId = ((Number) claims.get("memberId")).longValue();
            memberTagsList = memberService.findMember(memberId).getTagList();
        }catch(NullPointerException e){
            isLogin = false;
        }

        //로그인안하고 custom = true로 요청을 보낸다면 예외발생
        if(!isLogin && custom) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);


        List<Item> items = itemService.findFilteredItems(categoryENName, custom, title, page, memberTagsList);

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

        ItemSearchResponseDto.MemberTagInfo memberTagInfo = ItemSearchResponseDto.MemberTagInfo.builder()
                .memberTagsList(memberTagsList)
                .build();

        ItemSearchResponseDto response = ItemSearchResponseDto.builder()
                .cosmetics(searchItemDtos)
                .member(memberTagInfo)
                .build();


        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/details/{itemId}")
    public ResponseEntity getItem(@PathVariable("itemId") Long itemId){
        Item item = itemService.findItem(itemId);
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

        ItemSimpleResponseDto response = ItemSimpleResponseDto.builder()
                .itemInfo(itemInfo)
                .reviews(responseReviews)
                .build();


        return new ResponseEntity<>(response,HttpStatus.OK);

    }


}
