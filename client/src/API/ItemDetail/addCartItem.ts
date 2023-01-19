import axios from "axios";

interface ProductData {
  memberId: number;
  itemId: number;
  itemCount: number;
  itemTotalPrice: number;
}

export const addCartItem = (cartItem: ProductData) => {
  const request = {
    itemId: cartItem.itemId,
    itemCount: cartItem.itemCount,
    itemTotalPrice: cartItem.itemTotalPrice,
  };
  // 추후 토큰 인스턴스로 변경 예정
  axios.patch(
    `http://13.209.97.3:8080/api/v1/members/${cartItem.memberId}/carts`,
    JSON.stringify(request)
  ).then((res)=> {
    if(res.data.code === 200){
      alert("장바구니에 추가 되었습니다 🐰")
    }
  });
};