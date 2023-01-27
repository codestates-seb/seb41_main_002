import {defaultInstance} from "../../API/Core"

interface ItemType {
  itemId: number;
  itemTitle: string;
  categoryKRName: string;
  titleImageURL: string;
  contentImageURL: string;
  content: string;
  price: number;
  tagList: string[];
  rating: number;
}

export interface ReviewType {
  memberId: number;
  accountId: string;
  reviewId: number;
  reviewTitle: string;
  reviewContent: string;
  createdAt: string;
  modifiedAt: string;
  reviewRating: number;
}

export interface ItemDetailDataType {
  itemInfo: ItemType
  reviews?: ReviewType[];
}

export default function getItemDetail(
  itemId: string | undefined
): Promise<ItemDetailDataType> {
  return new Promise(async (resolve) => {
    let result: any;
    try {
      const itemDetailData = await defaultInstance.get(
        `/items/details/${itemId}`
      );
      result = itemDetailData.data;
    } catch (error) {
      console.error(error);
    }
    resolve(result);
  });
}
