import CustomButton from "./Commons/Buttons";
import { useState } from "react";
import { Link } from "react-router-dom";

interface OrderType {
  orderId: number;
  orderCreatedAt: string;
  orderStatus: string;
  totalPrice: number;
  orderItems: ItemType[];
}

interface ItemType {
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  itemTotalPrice: number;
  count: number;
}

const OrderHistoryItem = ({ order }: { order: OrderType }) => {
  const [isActive, setIsActive] = useState(false);
  const openAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className="Order_History_Item">
        <div>
          <span className="Order_Detail_Indicator">주문 일자</span>
          <div>{order.orderCreatedAt}</div>
        </div>
        <div>
          <span className="Order_Detail_Indicator">주문 금액</span>
          <div>{order.totalPrice} 원</div>
        </div>
        <div>
          <span className="Order_Detail_Indicator">배송 현황</span>
          <div>{order.orderStatus}</div>
        </div>
        <div className="Order_Detail_Button_Wrapper" onClick={openAccordion}>
          <CustomButton
            bgColor="transparent"
            content={isActive ? "접기" : "자세히"}
            fontColor="skyblue"
            padding="10px"
            width="100px"
          />
        </div>
      </div>
      {isActive ? (
        <div>
          {order.orderItems.map((item: ItemType) => {
            return (
              <div
                className="Order_History_Content"
                key={`order${order.orderId}Item${item.itemId}`}
              >
                <div>
                  <img src={item.itemImageURL} alt="item image" />
                </div>
                <div>
                  <span className="Order_Detail_Indicator">상품명</span>
                  <Link to={`/itemDetail/${item.itemId}`}>
                    <div>{item.itemTitle} </div>
                  </Link>
                </div>
                <div>
                  <span className="Order_Detail_Indicator">상품 개수</span>
                  <div>{item.count}</div>
                </div>
                <div>
                  <span className="Order_Detail_Indicator">가격</span>
                  <div>{item.itemTotalPrice}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default OrderHistoryItem;
