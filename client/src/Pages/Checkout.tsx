import Modal from "../Components/Commons/Modal";
import NewAddress from "../Components/Payment/NewAddress";
import AddressDetail from "../Components/Payment/AddressDetail";
import OrderedListItem from "../Components/Commons/OrderedListItem";
import ShippingAddress from "../Components/Payment/ShippingAddress";
import { memberData, kakaoPaymentRequest } from "../API/Payment";
import { itemsCalculation, itemsOrganize } from "../Function/payment";
import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
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
    itemCount: number;
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

  interface ItemListType {
    itemId: number;
    itemCount: number;
    itemTotalPrice: number;
  }

  interface OrderSheetType {
    memberId: number;
    isPrimary?: boolean;
    addressId?: number;
    itemList: ItemListType[];
    itemsTotalPrice: number;
    totalPrice: number;
    usedReserve: number;
  }

  const [callAddressModal, setCallAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [memberInfo, setMemberInfo] = useState<GetMemberDataType | undefined>();
  const [useReserve, setUseReserve] = useState<number | undefined | string>(0);
  const [checkedList, setCheckedList] = useState<AddressType>();
  const { itemsTotalPrice, totalPrice, excludingPoints, itemListArray } =
    itemsCalculation(useReserve);
  const isAdressEmpty = checkedList && checkedList?.addressId > 0;
  const memberId = Number(sessionStorage.getItem("memberId"));
  const isSubscribe = sessionStorage.getItem("isSubscribed");

  const reserveInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (
      Number(target.value) > Number(memberInfo && memberInfo["memberReserve"])
    ) {
      setUseReserve(memberInfo && memberInfo["memberReserve"]);
    } else if (excludingPoints < Number(target.value)) {
      setUseReserve(excludingPoints);
    } else if (target.value === "") {
      setUseReserve(0);
    } else {
      setUseReserve(target.value.replace(/(^0+)/, ""));
    }
  };

  const paymentRequest = () => {
    const itemList = itemsOrganize();
    const orderSheet: OrderSheetType = {
      memberId: memberId,
      isPrimary: checkedList && checkedList.isPrimary,
      addressId: checkedList && checkedList.addressId,
      itemList: itemList,
      itemsTotalPrice: itemsTotalPrice,
      totalPrice: totalPrice,
      usedReserve: useReserve !== undefined ? Number(useReserve) : 0,
    };
    window.sessionStorage.setItem("orderSheet", JSON.stringify(orderSheet));

    if (window.confirm("결제를 진행하시겠습니까?")) {
      if (orderSheet.addressId === undefined) {
        alert("배송지를 선택해주세요!");
      } else {
        kakaoPaymentRequest(orderSheet, itemListArray[0].itemTitle).then(
          (res: { paymentURL: string; tid: string } | undefined) => {
            if (typeof res !== "undefined") {
              window.sessionStorage.setItem("tid", res.tid);
              window.location.replace(res.paymentURL);
            }
          }
        );
      }
    }
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

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setCallAddressModal(!callAddressModal);
    setZipcode(data.zonecode);
    setAddress(fullAddress);
  };

  return (
    <div className="Checkout_Container">
      {callAddressModal ? (
        <Modal
          modalState={callAddressModal}
          setModalState={setCallAddressModal}
          element={
            <DaumPostcode onComplete={handleComplete} autoClose={false} />
          }
        />
      ) : null}
      <h1 className="Checkout_Header">결제 페이지</h1>
      <section className="Checkout_Section">
        <div className="Member_Info">
          <span className="Member_Reserve">
            내 적립금 : {memberInfo && memberInfo["memberReserve"]}원
          </span>
          {memberInfo && (
            <MemberSubscribe
              subscribeCheck={isSubscribe && JSON.parse(isSubscribe)}
            >
              프리미엄 구독{" "}
              {isSubscribe && JSON.parse(isSubscribe) ? "사용" : "미사용"}
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
          {isSubscribe && JSON.parse(isSubscribe) ? "- 구독 혜택 1000원" : null}{" "}
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
        {isAdressEmpty ? (
          memberInfo && (
            <AddressDetail
              memberName={memberInfo.memberName}
              phoneNumber={memberInfo.phoneNumber}
              zipcode={checkedList.zipcode}
              address={checkedList.address}
            />
          )
        ) : (
          <NewAddress
            callAddressModal={callAddressModal}
            setCallAddressModal={setCallAddressModal}
            address={address}
            zipcode={zipcode}
          />
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
                {isSubscribe && JSON.parse(isSubscribe)
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
