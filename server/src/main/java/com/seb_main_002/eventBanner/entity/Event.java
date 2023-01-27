package com.seb_main_002.eventImage.entity;

import com.seb_main_002.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String title;

    private String content;

    private String eventImageUrl;

    private String endAt;
    @Enumerated(value=EnumType.STRING)
    private Event.EventStatus eventStatus = EventStatus.EVENT_PROGRESS;

    public enum EventStatus {
        EVENT_PROGRESS(1, "진행중인 이벤트"),
        EVENT_ENDED(2, "종료된 이벤트");

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        EventStatus(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
    }


}
