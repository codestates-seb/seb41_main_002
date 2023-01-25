import axios from "axios";

import { authInstance } from "./Core";

export interface ItemInfoType {
  itemTitle: string;
  categoryKRName: string;
  titleImageURL: string;
  tagList: string[];
  memberTagsList: string[];
}

export interface reviewType {
  orderItemId: number;
  itemId: number;
  memberId: number;
  reviewRating: number;
  reviewTitle: string;
  reviewContent: string;
}

export const getItemInfo = async (itemId: string) => {
  const itemInfo = await authInstance.get<ItemInfoType>(`/reviews/item/${itemId}`);
  console.log(itemInfo)
  return itemInfo.data;
};

export const reviewPost = async (review: reviewType) => {
  const reviewInfo = await authInstance.post(`/reviews`, review);
  
  return reviewInfo.data;
};