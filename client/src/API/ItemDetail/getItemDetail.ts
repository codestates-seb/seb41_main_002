import axios from "axios";

export interface ItemDetailData {
  itemInfo: {
    itemId: number;
    itemTitle: string;
    categoryKRName: string;
    titleImageURL: string;
    contentImageURL: string;
    content: string;
    price: number;
    tagList: string[];
    rating: number;
  },
  reviews: [
    {
      memberId: number;
      accountId: string;
      reviewId: number;
      reviewTitle: string;
      reviewContent: string;
      createdAt: string;
      modifiedAt: string;
      reviewRating: number;
    }
  ];
}

export default function getItemDetail(itemId: string | undefined): Promise<ItemDetailData> {
  // Promise를 Retrun 한다 [ 타입은 ItemDetailData 로]
  return new Promise((resolve) => {
    const result: ItemDetailData = {
      itemInfo: {
        itemId: 1, 
        itemTitle: "넘예뻐!앰플", 
        categoryKRName: "토너", 
        titleImageURL: "이미지URL", 
        contentImageURL: "이미지URL", 
        content: "내용", 
        price: 100, 
        tagList: ["건성","여드름성","지성", "복합성"], 
        rating: 3.5, 
      },
      reviews: [
        {
          memberId: 1, 
          accountId: "string", 
          reviewId: 1, 
          reviewTitle: "제목", 
          reviewContent: "내용", 
          createdAt: "2023/1/5/15:20", 
          modifiedAt: "2023/1/5/15:20", 
          reviewRating: 3.5, 
        },
      ],
    };
    try {
      //추후 데이터 기입 예정
      // const itemDetailData: = axios.get(`api/v1/items/details/${itemId}`)
      // result = itemDetailData
    } catch (error) {
      console.error(error);
    }

    resolve(result)
  });
}

// {
//   "itemInfo":{
//     itemId:number
//     itemTitle: string
//     categoryKRName:string
//     titleImageURL:string
//     contentImageURL:string
//    content: string
//     price:number
//     tagList: string[]
//     rating: number
//   },
//   "reviews":[{
//     "memberId": 1, 
//     "accountId": "string" 
//     "reviewId": 1, 
//     "reviewTitle": "제목", 
//     "reviewContent": "내용", 
//     "createdAt": "2023/1/5/15:20", 
//     "modifiedAt": "2023/1/5/15:20", 
//     "reviewRating": 3.5 
//   }]
// }
