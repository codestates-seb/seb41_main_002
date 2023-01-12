import OrderedListItem from "../Components/Commons/OrderedListItem";
import { 멤버정보, 결제, 주소입력 } from "../API/Payment";
import { useEffect, useState } from "react";
import styled from "styled-components";

import "./Style/checkout.css";

const 멤버구독 = styled.span<{ 구독여부: boolean }>`
  color: ${(props) => (props.구독여부 ? "green" : "red")};
  font-weight: 900;
`;

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
  const memberId: number = 1;

  interface 주소타입 {
    addressId: number;
    isPrimary: boolean;
    addressTitle: string;
    zipcode: string;
    address: string;
  }

  interface 멤버타입 {
    isSubscribe: boolean;
    memberReserve: number;
    addressList: 주소타입[];
  }

  const [멤버정보값, set멤버정보값] = useState<any>();
  const [사용할적립금, set사용할적립금] = useState();

  useEffect(() => {
    멤버정보(memberId)
      .then((res) => {
        console.log(res);
        set멤버정보값(res);
      })
      .catch((err) => {
        console.error(err);
      });

    const 주문 = {
      memberId: 1, // 맴버 id
      isPrimary: false, // 구독여부
      addressId: 1, //주소 id
      itemList: [
        //아이템 리스트(로컬 스토리지에서 받아오기)
        {
          itemId: 1,
          itemCount: 1,
          itemTotalPrice: 100,
        },
        {
          itemId: 2,
          itemCount: 1,
          itemTotalPrice: 100,
        },
      ],
      itemsTotalPrice: 100, // [ 원가 ]
      totalPrice: 100, // [ 배송비 포함가격 or 포함+할인적용가격 ]
      usedReserve: 3000, //사용 포인트
    };
    결제(주문).then((res) => {
      console.log(res);
    });
    const 주소1개 = {
      memberId: 1, // number
      isPrimary: false, // boolean
      addressTitle: "집", // string
      zipcode: "04567", // string
      address: "서울시 강서구 화곡동 56-536", // string
    };
    주소입력(주소1개).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="Checkout_Container">
      <h1 className="Checkout_Header">결제 페이지</h1>
      <section className="Checkout_Section">
        <div className="멤버정보">
          <span className="멤버적립금">
            내 적립금 : {멤버정보값 && 멤버정보값["memberReserve"]}원
          </span>
          <멤버구독 구독여부={멤버정보값 && 멤버정보값["isSubscribe"]}>
            프리미엄 구독{" "}
            {멤버정보값 && 멤버정보값["isSubscribe"] ? "사용" : "미사용"}
          </멤버구독>
        </div>
        <div className="상품리스트">
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
        </div>
        <div className="적립금사용">
          <label htmlFor="memberReserve">적립금 : </label>
          <input
            className="textBox"
            id="memberReserve"
            type="text"
            value={사용할적립금}
            placeholder={`${
              멤버정보값 && 멤버정보값["memberReserve"]
            }원 사용 가능`}
          />
        </div>

        <div className="금액계산">
          총 금액 : {totalPrice}원 + 배송비 3000원{" "}
          {멤버정보값 && 멤버정보값["isSubscribe"]
            ? "- 구독 혜택 1000원"
            : null}{" "}
          - 적립금 {myReserve} 원 = 총 {totalPrice + 500} 원
        </div>
      </section>
      <section className="Checkout_Section">
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
      <section className="Checkout_Section">
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
