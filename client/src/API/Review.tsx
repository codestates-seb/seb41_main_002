import { authInstance } from "./Core";

export interface ItemInfoType {
  itemTitle: string;
  categoryKRName: string;
  titleImageURL: string;
  tagList: string[];
  memberTagsList: string[];
}
export interface ReviewTextType {
  reviewTitle: string;
  reviewContent: string;
}

export interface ReviewType extends ReviewTextType{
  orderItemId: number;
  itemId: number;
  memberId: number;
  reviewRating: number;
}

interface ReviewInfoType {

}

export const getItemInfo = async (itemId: string) => {
  const itemInfo = await authInstance.get<ItemInfoType>(`/reviews/item/${itemId}`);
  return itemInfo.data;
};

export const reviewPost = async (review: ReviewType) => {
  const reviewInfo = await authInstance.post(`/reviews`, review).then(() => {
    alert("리뷰 작성 완료되었습니다.")
  }).catch(err => {
    alert("리뷰 작성을 이미 하셨습니다.")
  });
  return reviewInfo;
};

export const getReviewInfo = async (reviewId: number) => {
  const itemInfo = await authInstance.get<ItemInfoType>(`/reviews/${reviewId}`);
  return itemInfo.data;
};