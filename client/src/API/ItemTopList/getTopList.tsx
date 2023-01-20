import axios from "axios";

interface MemberType{
  memberTagList: string[]
}

interface TopProductList{
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
    memberTagList: MemberType[]
  }
  tagList: TopProductList[]
}

export const getTopList = (
  categoryENName: string,
  customCheck: boolean
): Promise<Array<TopProductData>> => {
  return new Promise(async (resolve) => {
    let result: any
    try {
      const responseData = await axios.get(`http://13.209.97.3:8080/api/v1/items/toplist/${categoryENName}?custom=${customCheck}`)
      result = responseData.data
    } catch (error) {
      console.error(error);
    }
    resolve(result);
  });
};
