import axios from "axios";
import productData from "../../data/shoppingList.json";

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
  return new Promise((resolve) => {
    const result: Array<ProductData> = [];
    try {
      // const responseData = await axios.get(`api/v1/items/${categoryENName}&custom=${boolean}&title=${keyword}&page=${page}`)
      // result.push(responseData.data.cosmetics)

      for (let i = 0; i < 16; i++) {
        result.push({
          member: {
            memberTagsList: ["tagElement", "tagElement2"],
          },
          itemId: 2,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          tagsList: ["건성", "일반피부"],
        });
      }
    } catch (error) {
      console.error(error);
    }
    resolve(result);
  });
};
