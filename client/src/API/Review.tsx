import axios from "axios";

import { defaultInstance } from "./Core";

export interface ItemInfoType {
  itemTitle: string;
  categoryKRName: string;
  titleImageURL: string;
  tagList: string[];
  memberTagsList: string[];
}

export const getItemInfo = async (itemId: string) => {
  const ItemInfo = await defaultInstance.get<ItemInfoType>(`/reviews/item/${itemId}`);
  return ItemInfo.data;
};
