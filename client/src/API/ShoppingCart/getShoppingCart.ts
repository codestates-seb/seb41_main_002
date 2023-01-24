import axios from "axios";

export interface CartDataType {
  isSubscribed: true;
  memberReserve: number
  cart: [
    {
      cartItemId: number
      itemId: number
      itemTitle: string
      titleImageURL: string
      itemCount: number
      itemTotalPrice: number
    }
  ];
}

export const getShoppingCart = (memberId:number):Promise<CartDataType> | undefined => {
  try{
    const result: Promise<CartDataType> = axios.get(`http://13.209.97.3:8080/api/v1/members/${memberId}/carts`)
    return result
  } catch(err){
    console.error(err)
  }
};
