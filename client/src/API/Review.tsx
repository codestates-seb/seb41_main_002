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

export interface ReviewUpdateType extends ReviewInfoType {
  reviewRating: number;
}

export interface ReviewUserInfoType extends ReviewInfoType {
  titleImageURL: string;
  itemTitle: string;
  reviewRating: number;
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
      alert("리뷰 작성 완료 되었습니다.");
    })
    .catch(() => alert("이미 리뷰를 작성 하였습니다."));
  return reviewInfo;
};

export const getReviewInfo = async (reviewId: number) => {
  const reviewInfo = await authInstance.get(`/reviews/${reviewId}`);
  return reviewInfo.data;
};

export const ReviewInfoUpdate = async (
  reviewId: number,
  review: ReviewUpdateType
) => {
  const reviewInfo = await authInstance.patch<ReviewUpdateType>(
    `/reviews/${reviewId}`,
    review
  );
  return reviewInfo;
};

export const ReviewInfoDelete = async (reviewId: number) => {
  const reviewInfo = await authInstance.delete<ReviewInfoType>(
    `/reviews/${reviewId}`
  );
  return reviewInfo;
};
