import { useParams } from "react-router-dom";
import { useEventDetail } from "../../services/api/events";
import "../../styles/browser.css";
import { formatDate } from "../../services/logic/formatDateForEvent";
import { useSport } from "../../services/api/sport";

export const SportsEvent = () => {
  const { id } = useParams();

  const { data: eventData, isLoading, error } = useEventDetail(id!);

  const {
    data: sports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useSport(eventData?.sportId!);

  if (sportsLoading) {
    return <div>Loading...</div>;
  }

  if (sportsError) {
    return <div>Something went wrong...</div>;
  }

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
        <p>- {sports?.name}</p>

        <h2>How many of us can play at max?</h2>
        <p>- {eventData?.capacity}</p>

        <h2>How many players signed up so far?</h2>
        <p>- {eventData?.signedUpPlayers}</p>
      </div>
    </div>
  );
};
