import axios from "axios";
import { defaultInstance, authInstance } from "../Core";

interface ParamsType {
  categoryENName: string;
  custom?: boolean;
  keyword?: string;
  page?: number;
  accessToken?: string | null;
}

export interface ProductData {
  member: {
    memberTagsList: string[];
  };
  itemId: number;
  itemTitle: string;
  categoryKRName: string;
  categoryENName: string;
  titleImageURL: string;
  price: number;
  tagsList: string[];
}

export const getProductList = (
  option: ParamsType
): Promise<Array<ProductData>> => {
  return new Promise(async (resolve, rejects) => {
    let result: Array<ProductData> = [];
    try {
      if (option.accessToken) {
        const responseData = await authInstance.get(
          `/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
        );
        result = responseData.data.cosmetics;
      } else {
        const responseData = await defaultInstance.get(
          `/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
        );
        result = responseData.data.cosmetics;
      }
    } catch (error) {
      rejects(error);
    }
    resolve(result);
  });
};

export const getMemberTagList = async (option: ParamsType) => {
  try {
    if (option.accessToken) {
      const resultData = await authInstance.get(
        `/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
      );
      return resultData.data.member;
    } else {
      const resultData = await defaultInstance.get(
        `/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
      );
      return resultData.data.member;
    }
  } catch (err) {
    console.error(err);
  }
};
