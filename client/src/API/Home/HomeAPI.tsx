import { defaultInstance } from "../Core";

interface EventDataType {
  eventId: number;
  title: string;
  eventTitleImageURL: string;
  createdAt: string;
  endAt: string;
}

interface TopRankType {
  categoryKRName: string;
  categoryENName: string;
  topListURL: string;
}

export interface HomeDataType {
  bannerImageURL: string;
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
