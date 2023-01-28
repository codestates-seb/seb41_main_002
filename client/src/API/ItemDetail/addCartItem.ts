import { authInstance } from "../Core";

interface ProductData {
  memberId: string;
  itemId: number | undefined;
  itemCount: number;
  itemTotalPrice: number | null;
}

export const addCartItem = (cartItem: ProductData) => {
  const request = {
    itemId: cartItem.itemId,
    itemCount: cartItem.itemCount,
    itemTotalPrice: cartItem.itemTotalPrice,
  };
  authInstance
    .patch(`/members/${cartItem.memberId}/carts`, JSON.stringify(request),{
      headers: {
        "Content-Type": `application/json`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        alert("장바구니에 추가 되었습니다 🐰");
        window.location.reload()
      }
    })
    .catch((err) => {
      if (err.response.status) {
        alert("수량을 확인해주세요!");
      }
      console.error(err);
    });
};