import { EventForPreview } from "../interfaces/in/EventForPreview";
import "../styles/browser.css";

export const EventPreview = (props: { event: EventForPreview }) => {
  return (
    <div className="event-preview">
      <h3>{props.event.name}</h3>
      <p>Start date: {props.event.startDate}</p>
    </div>
  );
};
