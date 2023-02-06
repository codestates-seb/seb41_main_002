package com.seb_main_002.delivery.entity;


import com.seb_main_002.audit.Auditable;
import lombok.*;
import com.seb_main_002.order.entity.Order;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Delivery extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @Enumerated(value=EnumType.STRING)
    private DeliveryStatus deliveryStatus = DeliveryStatus.DELIVERY_BEFORE;

    private String address;

    private String zipcode;

    public enum DeliveryStatus {
            DELIVERY_BEFORE("배달 준비중"), DELIVERY_ACTIVE("배달 중"), DELIVERY_COMPLETED("배달 완료");

            private String status;

            DeliveryStatus(String status){
                this.status = status;
            }

    }

}
