import axios from "axios";

export interface TopProductData {
  itemId: number;
  itemTitle: string;
  categoryKRName: string;
  categoryENName: string;
  titleImageURL: string;
  price: number;
  salesCount: number;
  tagsList: string[];
}

export const getTopList = (
  categoryENName: string
): Promise<Array<TopProductData>> => {
  return new Promise((resolve) => {
    const result: Array<TopProductData> = [];
    try {
      // const responseData = await axios.get(`api/v1/items/toplist/${categoryENName}`)
      // result.push(responseData.data)
      result.push(
        {
          itemId: 1,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 2,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 3,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 4,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 5,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 6,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 7,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 8,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 9,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        },
        {
          itemId: 10,
          itemTitle: "제품명2",
          categoryKRName: "크림",
          categoryENName: "cream",
          titleImageURL: "이미지의URL",
          price: 200,
          salesCount: 100,
          tagsList: ["건성", "일반피부"],
        }
      );
    } catch (error) {
      console.error(error);
    }
    resolve(result);
  });
};
