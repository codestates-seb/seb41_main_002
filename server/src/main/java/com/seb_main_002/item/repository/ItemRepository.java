package com.seb_main_002.item.repository;

import com.seb_main_002.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findAllByCategoryENName(String categoryENName, Pageable pageable);

    @Query(value = "SELECT ITEM_ID, CREATED_AT, LAST_MODIFIED_AT, CATEGORYENNAME, CATEGORYKRNAME, CONTENT, CONTENT_IMAGE_URL, ITEM_TITLE, PRICE, SALES_COUNT, RATING,TITLE_IMAGE_URL\n" +
            "FROM ITEM LEFT JOIN ITEM_TAG_LIST ON ITEM.ITEM_ID =ITEM_TAG_LIST.ITEM_ITEM_ID\n" +
            "WHERE TAG_LIST = '건성' \n" +
            "OR TAG_LIST = '일반피부'\n" +
            "AND CATEGORYENNAME LIKE 'cream%'\n" +
            "AND ITEM_TITLE LIKE '%%'\n" +
            "GROUP BY ITEM_ID\n" +
            "HAVING COUNT(ITEM_ID) >1", nativeQuery = true)
    Page<Item> findByCustomItem(String tag1, String tag2, String categoryENName, String title, Pageable pageable);

    Page<Item> findAllByCategoryENNameContainingAndItemTitleContaining(String categoryENName, String title, Pageable pageable);

}
