import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventType, getEventData } from "../API/Event/EventAPI";
import "./Style/eventDetail.css";

export default function EventDetail() {
  const eventId = useParams();
  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    try {
      getEventData(Number(eventId)).then((res) => {
        console.log(res);
        setEvent(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div>
      <h1 className="Event_Title">{event?.title}</h1>
      <div className="Event_Posted_Date">{event?.createdAt}</div>

      <div className="Event_Image">
        <img src={event?.eventImageURL} alt="event image"></img>
      </div>

      <div>
        <div className="Event_Term">
          기간:
          <span>{event?.createdAt}</span> ~ <span>{event?.endAt}</span>
        </div>
        <div className="Event_Detail">{event?.content}</div>
      </div>
    </div>
  );
}
