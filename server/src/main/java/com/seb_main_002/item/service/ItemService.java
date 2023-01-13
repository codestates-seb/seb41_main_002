package com.seb_main_002.item.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
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
    public List<Item> findTopListItems(String categoryENName,int page,int size){
        Page<Item> findItems;
        if(categoryENName.equals("all")) {
            findItems = itemRepository.findAll(PageRequest.of(page, size, Sort.by("salesCount").descending()));
        }
        else {
            findItems = itemRepository.findAllByCategoryENName(categoryENName, PageRequest.of(0, 10, Sort.by("salesCount").descending()));
        }
        return findItems.getContent();
    }

    public List<Item> findFilteredItems(String categoryENName, Boolean custom, String title, int page){


        Page<Item> findItems;
        if(custom == false){
            findItems = itemRepository.findAllByCategoryENNameContainingAndItemTitleContaining(categoryENName,title, PageRequest.of(page,18));
        }
        else{
            List<String> membertags = memberRepository.findById(1L).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)).getTagList();
            //List<String> membertags = List.of("건성","일반피부");
            String tag1="", tag2="";
            if     (membertags.contains("건성")){ tag1 = "건성";}
            else if(membertags.contains("지성")){ tag1 = "지성";}
            else if(membertags.contains("복합성")){ tag1 = "복합성";}

            if     (membertags.contains("일반피부")){ tag2 = "일반피부";}
            else if(membertags.contains("여드름성 피부")){ tag2 = "여드름성 피부";}

            //tag stub 넣어서확인
            tag1 = "건성";
            tag2 = "일반피부";
            findItems = itemRepository.findByCustomItem(tag1, tag2, categoryENName,title,PageRequest.of(page,18));
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
}
