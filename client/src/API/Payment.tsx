import axios from "axios";
import { authInstance } from "./Core";

interface ItemType {
  itemId: number;
  itemCount: number;
  itemTotalPrice: number;
}

interface PaymentType {
  memberId: number;
  isPrimary?: boolean;
  addressId?: number;
  itemList: ItemType[];
  itemsTotalPrice: number;
  totalPrice: number;
  usedReserve: number;
}

interface AddressType {
  memberId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
}

interface OrderSheetType {
  memberId: number;
  isPrimary?: boolean;
  addressId?: number;
  itemList: ItemType[];
  itemsTotalPrice: number;
  totalPrice: number;
  usedReserve: number;
}

interface GetAddressType {
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
  addressList: GetAddressType[];
}

let CLIENT_URL = "http://seb41team02.s3-website.ap-northeast-2.amazonaws.com";

export const memberData = async (memberId: number) => {
  try {
    const response = await authInstance.get<GetMemberDataType>(
      `/members/${memberId}/payment`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const completePayment = async (order: PaymentType) => {
  const memberId = sessionStorage.getItem("memberId");
  const cartpayment = sessionStorage.getItem("cartpayment");
  try {
    await authInstance.post(`/orders`, order).then(() => {
      if (cartpayment === "true") {
        authInstance.delete(`/members/${memberId}/carts`);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const addAddress = async (addresses: AddressType) => {
  try {
    await authInstance.post(`/addresses`, addresses).then(() => {});
  } catch (error) {
    console.error(error);
  }
};

export const kakaoPaymentRequest = async (
  orderSheet: OrderSheetType,
  firstItem: string
) => {
  try {
    let paymentURL = "";
    let tid = "";
    let itemName =
      orderSheet.itemList.length > 1
        ? `${firstItem}+ 외 ${orderSheet.itemList.length - 1}`
        : firstItem;
    let totalAmount = orderSheet.totalPrice + orderSheet.usedReserve;
    const params = {
      cid: "TC0ONETIME",
      partner_order_id: "850625",
      partner_user_id: "850625",
      item_name: itemName,
      quantity: orderSheet.itemList.length,
      total_amount: totalAmount,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: `${CLIENT_URL}/payment/complete`,
      fail_url: `${CLIENT_URL}/checkout`,
      cancel_url: `${CLIENT_URL}/checkout`,
    };
    console.log(params);
    await axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 2d88767cdd0695fb947a662df1ed10d9",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((res) => {
      console.log(res.data.tid);
      tid = res.data.tid;
      paymentURL = res.data.next_redirect_pc_url;
    });

    return { paymentURL, tid };
  } catch (error) {
    console.error(error);
  }
};
