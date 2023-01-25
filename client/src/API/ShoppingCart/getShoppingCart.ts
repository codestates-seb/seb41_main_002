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
    //추후 데이터타입 변경예정
    const result: any = await authInstance.get(
      `/members/${memberId}/carts`,
    );
    console.log(result.data)
    return result.data;
  } catch (err) {
    console.error(err);
  }
};