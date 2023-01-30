import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventType, getEventData } from "../API/Event/EventAPI";
import "./Style/eventDetail.css";

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    try {
      getEventData(Number(eventId)).then((res) => {
        setEvent(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div>
      <div className="Event_Title_Banner">
        <img src={event?.eventTitleImageURL} alt="event image"></img>
      </div>
      <h1 className="Event_Detail_Title">{event?.title}</h1>
      <div className="Event_Term">
        {`${event?.createdAt.slice(0, 4)}년 ${event?.createdAt.slice(
          5,
          7
        )}월 ${event?.createdAt.slice(8, 10)}일 ~ ${event?.endAt.slice(
          0,
          4
        )}년 ${event?.endAt.slice(5, 7)}월 ${event?.endAt.slice(8, 10)}일 `}
      </div>

      <div>
        <div className="Event_Detail">
          <img src={event?.eventContentImageURL} alt="event image"></img>
        </div>
      </div>
    </div>
  );
}
