import { useParams } from "react-router-dom";
import { useEventDetail } from "../../services/api/events";
import "../../styles/browser.css";
import { formatDate } from "../../services/logic/formatDateForEvent";

export const SportsEvent = () => {
  let { id } = useParams();

  const { data: eventData, isLoading, error } = useEventDetail(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="browser-main-holder">
      <div className="browser-header">
        <h1>{eventData?.name}</h1>
      </div>
      <div className="events-detail-body">
        <h2>What the organizers say:</h2>
        <p>- {eventData?.description}</p>

        <h2>Where will we play?</h2>
        <p>- {eventData?.location}</p>

        <h2>When will we play?</h2>
        <p>- {formatDate(eventData?.startDate!)}</p>

        <h2>What will be played?</h2>
        <p>- {eventData?.sportId}</p>
        {/* TODO: Query the right sport name and show it here. */}

        <h2>How many of us can play at max?</h2>
        <p>- {eventData?.capacity}</p>
      </div>
    </div>
  );
};
