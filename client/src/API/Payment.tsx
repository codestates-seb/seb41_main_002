import axios from "axios";

interface 상품1개 {
  itemId: number;
  itemCount: number;
  itemTotalPrice: number;
}

interface 결제타입 {
  memberId: number;
  isPrimary: boolean;
  addressId: number;
  itemList: 상품1개[];
  itemsTotalPrice: number;
  totalPrice: number;
  usedReserve: number;
}

interface 주소타입 {
  memberId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string;
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

export const 멤버정보 = async (memberId: number) => {
  try {
    let 멤버데이터 = {};

    await axios
      .get(`http://localhost:8080/api/v1/members/${memberId}/payment`)
      .then((res) => {
        멤버데이터 = { ...res.data };
      });

    return 멤버데이터;
  } catch (error) {
    console.error(error);
  }
};

export const 결제 = async (주문: 결제타입) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/orders", 주문)
      .then((res) => {
        console.log("API 결제가 완료되었습니다.");
      });
  } catch (error) {
    console.error(error);
  }
};

export const 주소입력 = async (주소1개: 주소타입) => {
  try {
    let 입력한주소 = {};

    await axios
      .post("http://localhost:8080/api/v1/addresses", 주소1개)
      .then((res) => {
        입력한주소 = { ...res.data };
        console.log(res.data);
        //리프레쉬 토큰 재갱신
      });

    return 입력한주소;
  } catch (error) {
    console.error(error);
  }
};

export const 카카오결제 = async (주문서: 주문서타입, 첫상품명: string) => {
  try {
    let 결제URL = "";
    let 상품명 =
      주문서.itemList.length > 1
        ? `${첫상품명}+ 외 ${주문서.itemList.length - 1}`
        : 첫상품명;
    let 총금액 = 주문서.totalPrice + 주문서.usedReserve
    const params = {
      cid: "TC0ONETIME", //테스트를 위한 가맹점 코드 [테스트시 고정]
      partner_order_id: "850625", //결제건에 대한 가맹점의 주문번허 [아무거나 입력해도 될듯]
      partner_user_id: "850625", //가맹점에서 사용자를 구분할 수 있는 ID
      item_name: 상품명, //상품 이름, 복수 구매시 [상품명 외 3개] 형식으로 입력
      quantity: 주문서.itemList.length, //실험 해볼것
      total_amount: 총금액, //토탈 금액
      vat_amount: 0, //상품 부가세 금액
      tax_free_amount: 0, //상품 비과세 금액
      approval_url: "http://localhost:3000/", //결제 성공시 redirect url
      fail_url: "http://localhost:3000/", //결제 취소 시 redirect url
      cancel_url: "http://localhost:3000/", //결제 실패 시 redirect url
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
      console.log(res.data);
      결제URL = res.data.next_redirect_pc_url;
    });

    return 결제URL;
  } catch (error) {
    console.error(error);
  }
};