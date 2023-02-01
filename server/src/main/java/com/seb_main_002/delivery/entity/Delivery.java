package com.seb_main_002.delivery.entity;


import com.seb_main_002.audit.Auditable;
import lombok.Data;
import com.seb_main_002.order.entity.Order;
import javax.persistence.*;

@Data
@Entity
public class Delivery extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    @OneToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    private DeliveryStatus deliveryStatus;

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
