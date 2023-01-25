package com.seb_main_002.order.entity;

import com.seb_main_002.audit.Auditable;
import com.seb_main_002.item.entity.Item;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OrderItem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    private Integer itemCount;

    private Integer itemTotalPrice;

    private Boolean isReviewed = false;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;
}
