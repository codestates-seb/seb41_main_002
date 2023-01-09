package com.seb_main_002.EventImage.entity;

import com.seb_main_002.audit.Auditable;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class BannerImage extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannerImageId;

    private String bannerImageUrl;

}
