import { useProfileEvents } from "../services/api/profile";
import { formatDate } from "../services/logic/formatDateForEvent";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import "../styles/browser.css";

export const ProfileMyEvents = (props: {
  className: string;
  organizerId: string | null;
}) => {
  const {
    data: events,
    isLoading,
    error,
  } = useProfileEvents(props.organizerId as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h3>Looks like you're not an organizer - swr</h3>;
  }

  return (
    <div className={props.className}>
      <div className="profile-events-header">
        <h2>Events you created</h2>
      </div>
      <div className="profile-events-list">
        {events!.length === 0 && (
          <h3>Looks like you haven't created any events yet</h3>
        )}
        {events!.map((event) => (
          <Link
            className="event-preview-link"
            to={{
              pathname: `/event/${event.id}`,
            }}
            state={event.id}
          >
            <div key={event.id} className="profile-events-single">
              <h3>{event.name}</h3>
              <p>{formatDate(event.startDate)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
