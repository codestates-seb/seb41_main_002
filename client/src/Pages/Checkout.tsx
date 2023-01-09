import { useState } from "react";
import "./Style/Checkout.css";

export default function Checkout() {
  // 아래 더미 데이터는 이후 데이터 연동 후 대치 될 예정입니다.
  const [myReserve, setMyReserve] = useState<number>(300);
  const item1Count: number = 1;
  const item1Price: number = 30000;
  const item2Count: number = 2;
  const item2Price: number = 20000;
  const totalPrice: number = item1Count * item1Price + item2Count * item2Price;

  return (
    <div className="Checkout_Container">
      <h1>결제 정보 요약</h1>
      <section className="Price_Total_Summary">
        <div className="Summary_List_Item">
          <span>내 적립금: 총 {myReserve}원 </span>
          <span>현재 구독중</span>
        </div>
        {/* 예시 상품 2개는 이후 데이터로 연동된 후 삭제될 예정입니다. */}
        <div className="to_Be_Replaced Order_Item">
          <img src="https://picsum.photos/75?random=1" alt="sample image" />
          <span>어머 너무 이뻐요 앰플 </span>
          <span>수량: {item1Count}개 </span>
          <span>가격: {item1Count * item1Price}원 </span>
        </div>
        <div className="to_Be_Replaced Order_Item">
          <img src="https://picsum.photos/75?random=2" alt="sample image" />
          <span>어머 너무 이뻐요 앰플 </span>
          <span>수량: {item2Count}개 </span>
          <span>가격: {item2Count * item2Price}원 </span>
        </div>
        <div className="Summary_List_Item">
          <label>적립금: </label>
          <input type="text" placeholder={`${myReserve}원 사용 가능`} />
        </div>

        <div className="Summary_List_Item">
          제품 가격: {totalPrice}원 + 배송비 3,000원 - 구독 1,000원 - 적립금{" "}
          {myReserve} 원 = 총 {totalPrice + 1700} 원
        </div>
      </section>
      <section className="Delivery_Summary"></section>
      <section className="Payment_Method_Summary"></section>
    </div>
  );
}
