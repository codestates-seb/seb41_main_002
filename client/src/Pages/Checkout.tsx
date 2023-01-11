import { useState } from "react";
import OrderedListItem from "../Components/Commons/OrderedListItem";
import "./Style/Checkout.css";

export default function Checkout() {
  // 아래 더미 데이터는 이후 데이터 연동 후 대치 될 예정입니다.
  const [myReserve, setMyReserve] = useState<number>(1500);
  const [totalPrice, setTotalPrice] = useState<number>(50000);
  interface ItemInterface {
    name: string;
    price: number;
    count: number;
  }

  const items: ItemInterface[] = [
    { name: "어머 너무 이뻐요 앰플", price: 30000, count: 1 },
    { name: "어머 너무 촉촉해요 앰플", price: 20000, count: 2 },
  ];

  return (
    <div className="Checkout_Container">
      <h1 className="Checkout_Header">결제 정보 요약</h1>
      <section className="Price_Total_Summary">
        <div className="Summary_List_Item">
          <span className="List_Item_Title">내 적립금: 총 {myReserve}원 </span>
          <span className="List_Item_Content">현재 구독중</span>
        </div>
        {/* 예시 상품 2개는 이후 데이터로 연동된 후 삭제될 예정입니다. */}
        {items.map((item, idx) => {
          return (
            <OrderedListItem
              item={item}
              idx={idx}
              key={`OrderListItem${idx}`}
            />
          );
        })}
        <div className="List_Item_Reserve">
          <label>적립금: </label>
          <input type="text" placeholder={`${myReserve}원 사용 가능`} />
        </div>

        <div className="Summary_List_Item">
          제품 가격: {totalPrice}원 + 배송비 3,000원 - 구독 1,000원 - 적립금{" "}
          {myReserve} 원 = 총 {totalPrice + 500} 원
        </div>
      </section>
      <section className="Delivery_Summary">
        <div className="Summary_List_Item">
          대표 주소: 서울특별시 서초구 서초대로 396 20층, 06619 (집)
        </div>
        <div className="Summary_List_Item">
          <span className="List_Item_Title">이름</span>
          <span className="List_Item_Content">홍길동</span>
        </div>
        <div className="Summary_List_Item">
          <span className="List_Item_Title">이메일</span>
          <span className="List_Item_Content">sampleemail@gmail.com</span>
        </div>
        <div className="Summary_List_Item">
          <span className="List_Item_Title">연락처</span>
          <span className="List_Item_Content">010-1234-5678</span>
        </div>
        <div className="Summary_List_Item">
          <label className="List_Item_Title">배송 시 요청사항</label>
          <select name="requests" className="List_Item_Select">
            <option value="배송메모를 선택해 주세요.">
              배송메모를 선택해 주세요.
            </option>
            <option value="배송 전에 미리 연락 바랍니다.">
              배송 전에 미리 연락 바랍니다.
            </option>
            <option value="부재 시 경비실에 맡겨 주세요.">
              부재 시 경비실에 맡겨 주세요.
            </option>
            <option value="부재 시 전화 주시거나 문자 남겨 주세요.">
              부재 시 전화 주시거나 문자 남겨 주세요.
            </option>
            <option value="요청 사항을 직접 입력합니다.">
              요청 사항을 직접 입력합니다.
            </option>
          </select>
        </div>
      </section>
      <section className="Payment_Method_Summary">
        <div className="Summary_List_Item">
          <label className="List_Item_Title">결제 수단: </label>
          <select name="requests" className="List_Item_Select">
            <option value="결제수단을 선택해 주세요.">
              결제수단을 선택해 주세요.
            </option>
            <option value="카드 결제">카드 결제</option>
            <option value="카카오페이">카카오페이</option>
            <option value="네이버페이">네이버페이</option>
            <option value="계좌 이체">계좌 이체</option>
          </select>
        </div>
        <div className="Final_Summary">
          <div className="Payment_Item">
            <div>결제 수단 이미지</div>
            <div>
              <img src="https://picsum.photos/75?random=3" alt="sample image" />
            </div>
            <button className="Pay_Button">결제하기</button>
          </div>
          <div className="Payment_Item">
            <div>카드 최종 결제 금액</div>
            <div>최종 금액: 42,000원</div>
            <div>적립금: 100원</div>
          </div>
        </div>
      </section>
    </div>
  );
}
