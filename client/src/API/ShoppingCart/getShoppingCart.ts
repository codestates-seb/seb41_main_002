import { authInstance } from "../Core";

export interface CartDataType {
  isSubscribed: true;
  memberReserve: number;
  cart: [
    {
      cartItemId: number;
      itemId: number;
      itemTitle: string;
      titleImageURL: string;
      itemCount: number;
      itemTotalPrice: number;
    }
  ];
}

export const getShoppingCart = async (
  memberId: string
) => {
  try {
    const result = await authInstance.get(
      `/members/${memberId}/carts`,
    );
    return result.data;
  } catch (err) {
    console.error(err);
  }
};