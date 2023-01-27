import axios from "axios";
import { defaultInstance } from "../Core";

interface EventDataType {
  eventId: number;
  title: string;
  eventImageURL: string;
  createdAt: string;
  endAt: string;
}

interface TopRankType {
  categoryKRName: string;
  categoryENName: string;
  topListURL: string;
}

export interface HomeDataType {
  bannerImageUrl: string;
  eventsInfo: EventDataType[];
  topRankBanners: TopRankType[];
}

export const getHomeData = async () => {
  try {
    const response = await defaultInstance.get<HomeDataType>(`/home`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
