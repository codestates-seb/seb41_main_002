import { defaultInstance, authInstance } from "../Core";
//추후 타입 변경 예정
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
    //추후 타입변경 예정
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
