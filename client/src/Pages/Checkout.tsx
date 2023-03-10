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

    if (window.confirm("????????? ?????????????????????????")) {
      if (orderSheet.addressId === undefined) {
        alert("???????????? ??????????????????!");
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
      <h1 className="Checkout_Header">?????? ?????????</h1>
      <section className="Checkout_Section">
        <div className="Member_Info">
          <span className="Member_Reserve">
            ??? ????????? : {memberInfo && memberInfo["memberReserve"]}???
          </span>
          {memberInfo && (
            <MemberSubscribe
              subscribeCheck={isSubscribe && JSON.parse(isSubscribe)}
            >
              ???????????? ??????{" "}
              {isSubscribe && JSON.parse(isSubscribe) ? "??????" : "?????????"}
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
          <label htmlFor="memberReserve">????????? : </label>
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
            }??? ?????? ??????`}
          />
        </div>
        <div className="Calculate_Container">
          ??? ?????? : {itemsTotalPrice}??? + ????????? 3000???{" "}
          {isSubscribe && JSON.parse(isSubscribe) ? "- ?????? ?????? 1000???" : null}{" "}
          {useReserve === undefined ? null : "- ????????? " + useReserve + "???"} =
          ??? {totalPrice} ???
        </div>
      </section>
      <section className="Checkout_Section">
        <h2>????????? ??????</h2>
        <div className="Shipping_Address_Check">
          <p>????????? ??????</p>
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
              <label htmlFor="newAddress">???????????????</label>
            </div>
            <div className="Shipping_Address_Container">
              ????????? :
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
        <h2>??????????????? ??????</h2>
        <div className="Final_Summary">
          <div className="Payment_Container">
            <img src="https://img.seoul.co.kr/img/upload/2022/01/04/SSI_20220104190629_O2.jpg" />
            <ul className="Payment_History">
              <li>?????? ?????? ?????? ??????</li>
              <li>?????? ??????: {totalPrice}???</li>
              <li>
                ?????????:{" "}
                {isSubscribe && JSON.parse(isSubscribe)
                  ? itemsTotalPrice * 0.03
                  : itemsTotalPrice * 0.01}
                ???
              </li>
              <li>
                <button className="Pay_Button" onClick={paymentRequest}>
                  ????????????
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
