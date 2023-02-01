package com.seb_main_002.item.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Transactional
@Service
public class ItemService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

    public ItemService(AmazonS3 amazonS3, ItemRepository itemRepository, MemberRepository memberRepository) {
        this.amazonS3 = amazonS3;
        this.itemRepository = itemRepository;
        this.memberRepository = memberRepository;
    }

    public Item createItem(Item item){
        return itemRepository.save(item);
    }

    //public Item updateItem(Item item){}

    public Item findItem(Long itemId){
        return findVerifiedItem(itemId);
    }

    //public void deleteItem(Long itemId){}

    public String uploadImage(InputStream input, String fileName, long fileSize) throws IOException {
        String s3FileName = UUID.randomUUID()+"-"+ fileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(fileSize);

        amazonS3.putObject(bucket, s3FileName, input, objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }


    //상위 10개만 출력
//    public List<Item> findTopListItems(String categoryENName, Boolean custom, List<String> memberTagList){
//
//
//        if(categoryENName.equals("all")) categoryENName = "";
//        if(custom == null) custom = false;
//
//        Page<Item> findItems;
//
//        if(custom == true && memberTagList.size() != 0){
//            String tag1="", tag2="";
//            if     (memberTagList.contains("건성")){ tag1 = "건성";}
//            else if(memberTagList.contains("지성")){ tag1 = "지성";}
//            else if(memberTagList.contains("복합성")){ tag1 = "복합성";}
//
//            if     (memberTagList.contains("일반피부")){ tag2 = "일반피부";}
//            else if(memberTagList.contains("여드름성 피부")){ tag2 = "여드름성 피부";}
//
//            findItems = itemRepository.findCustomTopListItem(tag1,tag2,categoryENName,PageRequest.of(0, 10, Sort.by("salesCount").descending()));
//        }
//        else{
//            findItems = itemRepository.findAllByCategoryENNameStartingWith(categoryENName, PageRequest.of(0, 10, Sort.by("salesCount").descending()));
//        }
//
//        return findItems.getContent();
//    }

    public List<Item> findFilteredItems(String categoryENName, Boolean custom, String title, int page, List<String> memberTagList, Boolean topListFlag){

        if(categoryENName.equals("all")) categoryENName = "";
        if(custom == null) custom = false;
        if(title == null) title = "";

        //로그인여부에따른 custom 예외처리
        if(memberTagList == null && custom == true ) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        Page<Item> findItems;

        if(custom == true && memberTagList.size() != 0){
            String tag1="", tag2="";
            if     (memberTagList.contains("건성")){ tag1 = "건성";}
            else if(memberTagList.contains("지성")){ tag1 = "지성";}
            else if(memberTagList.contains("복합성")){ tag1 = "복합성";}

            if     (memberTagList.contains("일반피부")){ tag2 = "일반피부";}
            else if(memberTagList.contains("여드름성 피부")){ tag2 = "여드름성 피부";}

            if(topListFlag)
                findItems = itemRepository.findCustomTopListItem(tag1,tag2,categoryENName,PageRequest.of(0, 10, Sort.by("salesCount").descending()));
            else
                findItems = itemRepository.findCustomItem(tag1, tag2, title,categoryENName, PageRequest.of(page,18));
        }
        else{
            if(topListFlag)
                findItems = itemRepository.findAllByCategoryENNameStartingWith(categoryENName, PageRequest.of(0, 10, Sort.by("salesCount").descending()));
            else
                findItems = itemRepository.findAllByCategoryENNameStartingWithAndItemTitleContaining(categoryENName,title, PageRequest.of(page,18));
        }

        return findItems.getContent();
    }
    public Item findVerifiedItem(Long itemId){
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        Item findItem = optionalItem
                .orElseThrow( () ->
                        new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
        return findItem;
    }


    public List<String> findVerifiedMemberTagList(Long memberId){
        if(memberId == null)
            return null;

        Member findMember = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember.getTagList();
    }
}
