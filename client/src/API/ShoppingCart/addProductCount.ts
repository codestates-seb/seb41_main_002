import { authInstance } from "../Core";
export const addProductCount = async (
  memberId: string,
  cartItemId: number,
  itemCount: number
) => {
  try {
    authInstance.patch(`members/${memberId}/carts/${cartItemId}`, {
      "itemCountChange": itemCount,
    });
  } catch (err) {
    console.error(err);
  }
};
