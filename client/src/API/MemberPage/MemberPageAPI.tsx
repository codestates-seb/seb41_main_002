import { authInstance } from "../Core";

export interface OrderType {
  orderId: number;
  orderCreatedAt: string;
  orderStatus: string;
  totalPrice: number;
  orderItems: ItemType[];
}

export interface ItemType {
  orderItemId: number;
  isReviewed: boolean;
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  count: number;
  itemTotalPrice: number;
}

export interface ReviewType {
  reviewId: number;
  itemId: number;
  itemImageURL: string;
  itemTitle: string;
  reviewTitle: string;
  createdAt: string;
  modifiedAt: string;
  reviewRating: number;
}

export interface ProfileDataType {
  accountId: string;
  email: string;
  birthdate: string;
  phoneNumber: string;
  memberName: string;
  zipcode: string;
  address: string;
  isSubscribed: boolean;
  memberReserve: number;
  tagList: string[];
  ordersHistory: OrderType[];
  reviews: ReviewType[];
}

export const getProfileData = async (memberId: number) => {
  try {
    const response = await authInstance.get<ProfileDataType>(
      `/members/${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
