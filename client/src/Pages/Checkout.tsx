import OrderedListItem from "../Components/Commons/OrderedListItem";
import { 멤버정보, 주소입력, 카카오결제요청 } from "../API/Payment";
import { 상품계산, 상품정리 } from "../Function/payment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./Style/checkout.css";
import ShippingAddress from "../Components/Payment/ShippingAddress";

const 멤버구독 = styled.span<{ 구독여부: boolean }>`
  color: ${(props) => (props.구독여부 ? "green" : "red")};
  font-weight: 900;
`;

export default function Checkout() {
  interface ItemInterface {
    name: string;
    price: number;
    count: number;
  }

  interface 로컬타입 {
    itemId: number;
    itemTitle: string;
    titleImageURL: string;
    itemCount: number;
    itemTotalPrice: number;
  }

  interface 주소타입 {
    address: string;
    addressId: number;
    addressTitle: string;
    isPrimary: boolean;
    zipcode: string;
  }

  interface 주문서타입 {
    memberId: number;
    isPrimary: any;
    addressId: number;
    itemList: {
      itemId: number;
      itemCount: number;
      itemTotalPrice: number;
    }[];
    itemsTotalPrice: number;
    totalPrice: number;
    usedReserve: number;
  }

  const [멤버정보값, set멤버정보값] = useState<any>();
  const [사용할적립금, set사용할적립금] = useState<
    number | undefined | string
  >();
  const { itemsTotalPrice, totalPrice, 적립금제외, 상품필터 } = 상품계산(
    사용할적립금,
    멤버정보값 && 멤버정보값["isSubscribe"]
  );

  // 더미 데이터 연동 후 지울 예정
  const arr = [
    {
      itemId: 1,
      itemTitle: "상품이름1",
      titleImageURL: "https://picsum.photos/75?random=1",
      itemCount: 3,
      itemTotalPrice: 30000,
    },
    {
      itemId: 2,
      itemTitle: "상품이름2",
      titleImageURL: "https://picsum.photos/75?random=2",
      itemCount: 2,
      itemTotalPrice: 20000,
    },
    {
      itemId: 3,
      itemTitle: "상품이름3",
      titleImageURL: "https://picsum.photos/75?random=3",
      itemCount: 6,
      itemTotalPrice: 60000,
    },
  ];

  const arrString = JSON.stringify(arr);
  window.localStorage.setItem("itemList", arrString);

  const memberId: number = 1;
  //----------------------------------------------------------

  const 적립금입력 = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (적립금제외 < Number(target.value)) {
      set사용할적립금(적립금제외);
    } else if (
      Number(target.value) > Number(멤버정보값 && 멤버정보값["memberReserve"])
    ) {
      set사용할적립금(멤버정보값 && 멤버정보값["memberReserve"]);
    } else if (target.value === "") {
      set사용할적립금(0);
    } else {
      set사용할적립금(target.value.replace(/(^0+)/, ""));
    }
  };

  const 결제요청 = () => {
    const itemList = 상품정리();
    const 주문서: 주문서타입 = {
      memberId: memberId, //연동 이후 변경
      isPrimary: 멤버정보값["isSubscribe"],
      addressId: 1, //주소 id
      itemList: itemList,
      itemsTotalPrice: itemsTotalPrice,
      totalPrice: totalPrice,
      usedReserve: 사용할적립금 !== undefined ? Number(사용할적립금) : 0,
    };

    window.localStorage.setItem("orderSheet", JSON.stringify(주문서));

    카카오결제요청(주문서, 상품필터[0].name).then(
      (res: { 결제URL: string; tid: string } | undefined) => {
        if (typeof res !== "undefined") {
          window.localStorage.setItem("tid", res.tid);
          window.location.replace(res.결제URL);
        }
        console.log("카카오 결제가 완료되었습니다");
      }
    );
  };

  useEffect(() => {
    멤버정보(memberId)
      .then((res) => {
        console.log(res);
        set멤버정보값(res);
      })
      .catch((err) => {
        console.error(err);
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
          {상품필터.map((item: ItemInterface, idx: number) => {
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
            onChange={(e) => {
              적립금입력(e);
            }}
            value={사용할적립금}
            placeholder={`${
              멤버정보값 && 멤버정보값["memberReserve"]
            }원 사용 가능`}
          />
        </div>

        <div className="금액계산">
          총 금액 : {itemsTotalPrice}원 + 배송비 3000원{" "}
          {멤버정보값 && 멤버정보값["isSubscribe"]
            ? "- 구독 혜택 1000원"
            : null}{" "}
          {사용할적립금 === undefined
            ? null
            : "- 적립금 " + 사용할적립금 + "원"}{" "}
          = 총 {totalPrice} 원
        </div>
      </section>
      <section className="Checkout_Section">
        <h2>배송지 정보</h2>
        <div className="배송지선택">
          <p>배송지 선택</p>
          <div>
            <div className="배송지박스">
              <input id="newAddress" type="radio" name="address" />
              <label htmlFor="newAddress">신규배송지</label>
            </div>
            <div className="배송지박스">
              최근 :
              {멤버정보값 &&
                멤버정보값["addressList"].map(
                  (address: 주소타입, index: number) => {
                    return (
                      <ShippingAddress
                        key={"address" + index}
                        address={address}
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
        <div className="배송지상세정보"></div>
        <div className="Summary_List_Item">
          <select name="requests" className="">
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
        <h2>카카오페이 결제</h2>
        <div className="Final_Summary">
          <div className="결제컨테이너">
            <img src="https://img.seoul.co.kr/img/upload/2022/01/04/SSI_20220104190629_O2.jpg" />
            <ul className="결제내역">
              <li>카드 최종 결제 금액</li>
              <li>최종 금액: {totalPrice}원</li>
              <li>적립금: {멤버정보값 && 멤버정보값["isSubscribe"] ? itemsTotalPrice*0.03 : itemsTotalPrice*0.01}원</li>
              <li>
                <button className="Pay_Button" onClick={결제요청}>
                  결제하기
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
