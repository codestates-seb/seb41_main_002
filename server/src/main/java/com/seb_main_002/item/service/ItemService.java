package com.seb_main_002.item.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb_main_002.item.entity.Item;
import com.seb_main_002.item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Transactional
@Service
public class ItemService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final ItemRepository itemRepository;

    public ItemService(AmazonS3 amazonS3, ItemRepository itemRepository) {
        this.amazonS3 = amazonS3;
        this.itemRepository = itemRepository;
    }

    public String uploadImage(InputStream input, String fileName, long fileSize) throws IOException {
        String s3FileName = UUID.randomUUID()+"-"+ fileName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(fileSize);

        amazonS3.putObject(bucket, s3FileName, input, objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    public Item createItem(Item item){
        return itemRepository.save(item);
    }
}
