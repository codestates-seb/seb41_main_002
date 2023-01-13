import dummyData from "./../../data/MemberPageData.json";
import CustomButton from "./Buttons";
import { useState } from "react";

const OrderHistoryItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  const openAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className="Order_History_Item">
        <div>
          <span className="Order_Detail_Indicator">주문 일자</span>
          <div>{dummyData.ordersHistory[0].orderCreatedAt}</div>
        </div>
        <div>
          <span className="Order_Detail_Indicator">주문 금액</span>
          <div>{dummyData.ordersHistory[0].totalPrice} 원</div>
        </div>
        <div>
          <span className="Order_Detail_Indicator">배송 현황</span>
          <div>{dummyData.ordersHistory[0].orderStatus}</div>
        </div>
        <div onClick={openAccordion}>
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
        <div className="Order_History_Item">
          <div>
            <img
              src={dummyData.ordersHistory[0].orderItems[0].itemImageURL}
              alt="item image"
            />
          </div>
          <div>
            <span className="Order_Detail_Indicator">상품명</span>
            <div>{dummyData.ordersHistory[0].orderItems[0].itemTitle} </div>
          </div>
          <div>
            <span className="Order_Detail_Indicator">상품 개수</span>
            <div>{dummyData.ordersHistory[0].orderItems[0].count}</div>
          </div>
          <div>
            <span className="Order_Detail_Indicator">가격</span>
            <div>{dummyData.ordersHistory[0].orderItems[0].itemTotalPrice}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderHistoryItem;
