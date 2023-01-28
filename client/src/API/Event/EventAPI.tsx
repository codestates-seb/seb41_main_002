import { defaultInstance } from "../Core";

export interface EventType {
  eventId: number;
  title: string;
  content: string;
  eventImageURL: string;
  createdAt: string;
  endAt: string;
}

export const getEventData = async (eventId: number) => {
  try {
    const response = await defaultInstance.get<EventType>(`/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
