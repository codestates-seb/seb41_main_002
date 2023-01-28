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

export interface ReviewType extends ReviewTextType {
  orderItemId: number;
  itemId: number;
  memberId: number;
  reviewRating: number;
}

export interface ReviewInfoType {
  memberId: number;
  reviewTitle: string;
  reviewContent: string;
}

export const getItemInfo = async (itemId: string) => {
  const itemInfo = await authInstance.get<ItemInfoType>(
    `/reviews/item/${itemId}`
  );
  return itemInfo.data;
};

export const reviewPost = async (review: ReviewType) => {
  const reviewInfo = await authInstance
    .post(`/reviews`, review)
    .then(() => {
      alert("리뷰 작성 완료되었습니다.");
    })
    .catch((err) => {
      alert("리뷰 작성을 이미 하셨습니다.");
    });
  return reviewInfo;
};

export const getReviewInfo = async (reviewId: number) => {
  const reviewInfo = await authInstance.get<ReviewInfoType>(
    `/reviews/${reviewId}`
  );
  return reviewInfo.data;
};

export const ReviewInfoUpdate = async (reviewId:number,review: ReviewInfoType) => {
  const reviewInfo = await authInstance.patch<ReviewInfoType>(
    `/reviews/${reviewId}`, review
  );
  return reviewInfo;
};

export const ReviewInfoDelete = async (reviewId:number) => {
  const reviewInfo = await authInstance.delete<ReviewInfoType>(
    `/reviews/${reviewId}`
  );
  return reviewInfo;
};