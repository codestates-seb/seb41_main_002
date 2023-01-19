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
  axios.post(
    `http://13.209.97.3:8080/api/v1/members/${cartItem.memberId}/carts`,
    JSON.stringify(request)
  );
};
