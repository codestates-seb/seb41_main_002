import axios from "axios";

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

export const 결제 = async (주문: 결제타입) => {
  try {
    let 토큰 = {
      토큰: "신기한토큰",
    };

    await axios
      .post("http://localhost:8080/api/v1/orders", 주문)
      .then((res) => {
        console.log("새로운 토큰이야!");
        //리프레쉬 토큰 재갱신
      });

    return 토큰;
  } catch (error) {
    console.error(error);
  }
};

interface 주소타입 {
  memberId: number;
  isPrimary: boolean;
  addressTitle: string;
  zipcode: string;
  address: string; 
}

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
