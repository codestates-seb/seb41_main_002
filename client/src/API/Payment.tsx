import axios from "axios";

interface Item {
  itemId: number;
  itemCount: number;
  itemTotalPrice: number;
}

interface PaymentType {
  memberId: number;
  isPrimary: boolean;
  addressId: number;
  itemList: Item[];
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

export const memberData = async (memberId: number) => {
  try {
    let MemberData = {};

    await axios
      .get(`http://localhost:8080/api/v1/members/${memberId}/payment`)
      .then((res) => {
        MemberData = { ...res.data };
      });

    return MemberData;
  } catch (error) {
    console.error(error);
  }
};

export const completePayment = async (order: PaymentType) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/orders", order)
      .then((res) => {
        console.log("API 서버 저장 완료");
      });
  } catch (error) {
    console.error(error);
  }
};

export const addAddress = async (addresses: AddressType) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/addresses", addresses)
      .then((res) => {
        console.log(res.data);
      });
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
      approval_url: `http://localhost:3000/payment/complete`,
      fail_url: "http://localhost:3000/checkout",
      cancel_url: "http://localhost:3000/checkout",
    };

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
