package com.seb_main_002.EventImage.entity;

import com.seb_main_002.audit.Auditable;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Event extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String title;

    private String content;

    private String eventImageUrl;

}
