import { Params } from "react-router-dom";
import { defaultInstance, authInstance } from "../Core";

interface MemberType {
  memberTagList: string[];
}

interface TopProductList {
  itemId: number;
  itemTitle: string;
  categoryKRName: string;
  categoryENName: string;
  titleImageURL: string;
  price: number;
  salesCount: number;
  tagsList: string[];
}

export interface TopProductData {
  member: {
    memberTagList: MemberType[];
  };
  tagList: TopProductList[];
}

export const getTopList = (
  categoryENName: string,
  customCheck: boolean,
  token: string | null
): Promise<Array<TopProductData>> => {
  return new Promise(async (resolve) => {
    let result: any;
    try {
      if (!token) {
        const responseData = await defaultInstance.get(
          `/items/toplist/${categoryENName}?custom=${customCheck}`
        );
        result = responseData.data;
      } else {
        const responseData = await authInstance.get(
          `/items/toplist/${categoryENName}?custom=${customCheck}`
        );
        result = responseData.data;
      }
    } catch (error) {
      console.error(error);
    }
    resolve(result);
  });
};
