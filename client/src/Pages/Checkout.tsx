import NewAddress from "../Components/Payment/NewAddress";
import AddressDetail from "../Components/Payment/AddressDetail";
import OrderedListItem from "../Components/Commons/OrderedListItem";
import ShippingAddress from "../Components/Payment/ShippingAddress";
import { memberData, kakaoPaymentRequest } from "../API/Payment";
import { itemsCalculation, itemsOrganize } from "../Function/payment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Style/checkout.css";

const MemberSubscribe = styled.span<{ subscribeCheck: boolean }>`
  color: ${(props) => (props.subscribeCheck ? "green" : "red")};
  font-weight: 900;
`;

export default function Checkout() {
  interface ItemType {
    itemId: number;
    itemImageURL: string;
    itemTitle: string;
    itemTotalPrice: number;
    count: number;
  }

  interface AddressType {
    address: string;
    addressId: number;
    addressTitle: string;
    isPrimary: boolean;
    zipcode: string;
  }

  interface GetMemberDataType {
    phoneNumber: string;
    memberName: string;
    isSubscribe: boolean;
    memberReserve: number;
    addressList: AddressType[];
  }

  interface OrderSheetType {
    memberId: number;
    isPrimary: boolean | undefined;
    addressId: number | undefined;
    itemList: {
      itemId: number;
      itemTotalPrice: number;
      count: number;
    }[];
    itemsTotalPrice: number;
    totalPrice: number;
    usedReserve: number;
  }

  const [memberInfo, setMemberInfo] = useState<GetMemberDataType | undefined>();
  const [useReserve, setUseReserve] = useState<number | undefined | string>(0);
  const [checkedList, setCheckedList] = useState<AddressType>();
  const { itemsTotalPrice, totalPrice, excludingPoints, itemListArray } =
    itemsCalculation(useReserve, memberInfo && memberInfo["isSubscribe"]);

  // 더미 데이터
  const memberId: number = 1;

  const reserveInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (excludingPoints < Number(target.value)) {
      setUseReserve(excludingPoints);
    } else if (
      Number(target.value) > Number(memberInfo && memberInfo["memberReserve"])
    ) {
      setUseReserve(memberInfo && memberInfo["memberReserve"]);
    } else if (target.value === "") {
      setUseReserve(0);
    } else {
      setUseReserve(target.value.replace(/(^0+)/, ""));
    }
  };

  const paymentRequest = () => {
    const itemList = itemsOrganize();
    const orderSheet: OrderSheetType = {
      memberId: memberId, //연동 이후 변경
      isPrimary: checkedList && checkedList.isPrimary,
      addressId: checkedList && checkedList.addressId,
      itemList: itemList,
      itemsTotalPrice: itemsTotalPrice,
      totalPrice: totalPrice,
      usedReserve: useReserve !== undefined ? Number(useReserve) : 0,
    };

    window.localStorage.setItem("orderSheet", JSON.stringify(orderSheet));

    kakaoPaymentRequest(orderSheet, itemListArray[0].itemTitle).then(
      (res: { paymentURL: string; tid: string } | undefined) => {
        if (typeof res !== "undefined") {
          window.localStorage.setItem("tid", res.tid);
          window.location.replace(res.paymentURL);
        }
        console.log("카카오 결제가 완료되었습니다");
      }
    );
  };

  const addressCheck = (address: AddressType) => {
    setCheckedList(address);
  };

  useEffect(() => {
    try {
      memberData(memberId).then((res) => {
        setMemberInfo(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="Checkout_Container">
      <h1 className="Checkout_Header">결제 페이지</h1>
      <section className="Checkout_Section">
        <div className="Member_Info">
          <span className="Member_Reserve">
            내 적립금 : {memberInfo && memberInfo["memberReserve"]}원
          </span>
          {memberInfo && (
            <MemberSubscribe subscribeCheck={memberInfo["isSubscribe"]}>
              프리미엄 구독{" "}
              {memberInfo && memberInfo["isSubscribe"] ? "사용" : "미사용"}
            </MemberSubscribe>
          )}
        </div>
        <div className="Item_List">
          {itemListArray.map((item: ItemType, idx: number) => {
            return (
              <OrderedListItem item={item} key={`OrderedListItem${idx}`} />
            );
          })}
        </div>
        <div className="Reserve_Container">
          <label htmlFor="memberReserve">적립금 : </label>
          <input
            className="textBox"
            id="memberReserve"
            type="text"
            onChange={(e) => {
              reserveInput(e);
            }}
            value={useReserve}
            placeholder={`${
              memberInfo && memberInfo["memberReserve"]
            }원 사용 가능`}
          />
        </div>
        <div className="Calculate_Container">
          총 금액 : {itemsTotalPrice}원 + 배송비 3000원{" "}
          {memberInfo && memberInfo["isSubscribe"]
            ? "- 구독 혜택 1000원"
            : null}{" "}
          {useReserve === undefined ? null : "- 적립금 " + useReserve + "원"} =
          총 {totalPrice} 원
        </div>
      </section>
      <section className="Checkout_Section">
        <h2>배송지 정보</h2>
        <div className="Shipping_Address_Check">
          <p>배송지 선택</p>
          <div>
            <div className="Shipping_Address_Container">
              <input
                id="newAddress"
                type="radio"
                name="address"
                defaultChecked
                onChange={() => {
                  addressCheck({
                    addressId: 0,
                    address: "",
                    addressTitle: "",
                    isPrimary: false,
                    zipcode: "",
                  });
                }}
              />
              <label htmlFor="newAddress">신규배송지</label>
            </div>
            <div className="Shipping_Address_Container">
              배송지 :
              {memberInfo &&
                memberInfo["addressList"].map(
                  (address: AddressType, index: number) => {
                    return (
                      <ShippingAddress
                        key={"address" + index}
                        address={address}
                        addressCheck={addressCheck}
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
        {checkedList && checkedList?.addressId > 0 ? (
          memberInfo && (
            <AddressDetail
              memberName={memberInfo.memberName}
              phoneNumber={memberInfo.phoneNumber}
              zipcode={checkedList.zipcode}
              address={checkedList.address}
            />
          )
        ) : (
          <NewAddress />
        )}
      </section>
      <section className="Checkout_Section">
        <h2>카카오페이 결제</h2>
        <div className="Final_Summary">
          <div className="Payment_Container">
            <img src="https://img.seoul.co.kr/img/upload/2022/01/04/SSI_20220104190629_O2.jpg" />
            <ul className="Payment_History">
              <li>카드 최종 결제 금액</li>
              <li>최종 금액: {totalPrice}원</li>
              <li>
                적립금:{" "}
                {memberInfo && memberInfo["isSubscribe"]
                  ? itemsTotalPrice * 0.03
                  : itemsTotalPrice * 0.01}
                원
              </li>
              <li>
                <button className="Pay_Button" onClick={paymentRequest}>
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
