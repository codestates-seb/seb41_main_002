import axios from "axios";

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

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const accessToken = sessionStorage.getItem("accessToken");

export const getHomeData = async () => {
  try {
    const response = await axios.get<HomeDataType>(`${BASE_URL}/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
