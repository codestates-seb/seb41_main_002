import { authInstance } from "../Core";
export const addProductCount = async (
  memberId: string,
  cartItemId: number,
  count: number
) => {
  try {
    authInstance.patch(`members/${memberId}/carts/${cartItemId}`, {
      "itemCountChange": count,
    });
  } catch (err) {
    console.error(err);
  }
};
