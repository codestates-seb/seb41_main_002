package com.seb_main_002.item.repository;

import com.seb_main_002.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findAllByCategoryENName(String categoryENName, Pageable pageable);
}
