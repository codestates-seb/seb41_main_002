package com.seb_main_002.item.repository;

import com.seb_main_002.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findAllByCategoryENNameStartingWith(String categoryENName, Pageable pageable);

    @Query(value = "SELECT i FROM Item i INNER JOIN i.tagList t WHERE t = :tag1 OR t = :tag2 AND i.categoryENName LIKE :categoryENName% GROUP BY i.itemId HAVING count(i.itemId)>1")
    Page<Item> findCustomTopListItem(String tag1,String tag2, String categoryENName, Pageable pageable);

    Page<Item> findAllByCategoryENNameStartingWithAndItemTitleContaining(String categoryENName, String title, Pageable pageable);

    @Query(value = "SELECT i FROM Item i INNER JOIN i.tagList t WHERE t = :tag1 OR t = :tag2 AND i.itemTitle LIKE %:title% AND i.categoryENName LIKE :categoryENName% GROUP BY i.itemId HAVING count(i.itemId)>1")
    Page<Item> findCustomItem(String tag1,String tag2, String title, String categoryENName, Pageable pageable);

    @Query(value = "SELECT * FROM item WHERE categoryenname = :categoryENName ORDER BY sales_count DESC", nativeQuery = true)
    List<Item> findItemsByENNameCategoryWithSalesCount(String categoryENName);

}
