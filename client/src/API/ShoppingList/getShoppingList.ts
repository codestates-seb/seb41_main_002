import axios from "axios";

interface ParamsType {
  categoryENName: string;
  custom?: boolean;
  keyword?: string;
  page?: number;
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
      const responseData = await axios.get(
        `http://13.125.242.34:8080/api/v1/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
      );
      result = responseData.data.cosmetics;
    } catch (error) {
      rejects(error);
    }
    resolve(result);
  });
};

export const getMemberTagList = async (option: ParamsType) => {
  try {
    const resultData = await axios.get(
      `http://13.125.242.34:8080/api/v1/items/${option.categoryENName}?custom=${option.custom}&title=${option.keyword}&page=${option.page}`
    );
    return resultData.data.member;
  } catch (err) {
    console.error(err);
  }
};
