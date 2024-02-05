import { EventForPreview } from "../interfaces/in/EventForPreview";
import { formatDate } from "../services/logic/formatDateForEvent";
import "../styles/browser.css";

export const EventPreview = (props: { event: EventForPreview }) => {
  return (
    <div className="event-preview">
      <h2>{props.event.name}</h2>
      <p>{formatDate(props.event.startDate)}</p>
    </div>
  );
};
