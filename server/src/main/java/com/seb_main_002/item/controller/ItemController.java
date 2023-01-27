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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/items")
@Validated
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
                                   @RequestPart(value = "itemPostDto") @Valid ItemPostDto itemPostDto) throws IOException {
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

        //로그인여부에따른 멤버아이디 얻기. 비로그인인 경우 memberId는 null값을 가짐
        Long memberId = getMemberIdWithHttpServletRequest(request);

        //로그인여부에따른 memberTagList 얻기. memberId가 null인경우 memberTagList는 null값을 가짐
        List<String> memberTagList = itemService.findVerifiedMemberTagList(memberId);

        List<Item> items = itemService.findFilteredItems(categoryENName, custom, null, 0, memberTagList, true);

        ItemTopListResponseDto response = mapper.itemsToItemTopListResponseDto(items,memberTagList);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{categoryENName}")
    public ResponseEntity getFilteredItems(@PathVariable("categoryENName") String categoryENName,
                                           @RequestParam(required = false) Boolean custom,
                                           @RequestParam(required = false) String title,
                                           @RequestParam @Positive int page,
                                           HttpServletRequest request){

        //로그인여부에따른 멤버아이디 얻기. 비로그인인 경우 memberId는 null값을 가짐
        Long memberId = getMemberIdWithHttpServletRequest(request);

        //로그인여부에따른 memberTagList 얻기. memberId가 null인경우 memberTagList는 null값을 가짐
        List<String> memberTagList = itemService.findVerifiedMemberTagList(memberId);

        List<Item> items = itemService.findFilteredItems(categoryENName, custom, title, page-1, memberTagList, false);

        ItemSearchResponseDto response = mapper.itemsToItemSearchResponseDto(items, memberTagList);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/details/{itemId}")
    public ResponseEntity getItem(@PathVariable("itemId") @Positive Long itemId){
        Item item = itemService.findItem(itemId);

        ItemSimpleResponseDto response = mapper.itemToItemSimpleResponseDto(item);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    private Long getMemberIdWithHttpServletRequest(HttpServletRequest request){
        Long memberId = null;
        try {
            Map<String, Object> claims = jwtVerificationFilter.verifyJws(request);
            memberId = ((Number) claims.get("memberId")).longValue();
        }catch(NullPointerException e){}
        return memberId;
    }

}
