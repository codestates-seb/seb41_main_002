import axios from "axios";

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

export interface ItemDetailData {
  itemInfo: ItemType
  reviews?: ReviewType[];
}

export default function getItemDetail(
  itemId: string | undefined
): Promise<ItemDetailData> {
  return new Promise(async (resolve) => {
    let result: any;
    try {
      const itemDetailData = await axios.get(
        `http://13.209.97.3:8080/api/v1/items/details/${itemId}`
      );
      result = itemDetailData.data;
    } catch (error) {
      console.error(error);
    }

    resolve(result);
  });
}
