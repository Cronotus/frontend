import { useProfileEvents } from "../services/api/profile";
import { formatDate } from "../services/logic/formatDateForEvent";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";
import "../styles/browser.css";
import { EventPreviewsByProfileLoading } from "./loadings/EventPreviewByProfileLoading";
import { Button } from "@mui/material";

export const ProfileMyEvents = (props: {
  className: string;
  organizerId: string | null;
}) => {
  const navigate = useNavigate();
  const {
    data: events,
    isLoading,
    error,
  } = useProfileEvents(props.organizerId as string);

  if (error) {
    return <h3>Looks like you're not an organizer</h3>;
  }

  return (
    <div className={props.className}>
      <div className="profile-events-header">
        <h2>Events you created</h2>
      </div>
      <div className="profile-events-list">
        {isLoading ? (
          <EventPreviewsByProfileLoading />
        ) : (
          <>
            {events!.length === 0 && (
              <div className="profile-events-not-organizer">
                <h3>Looks like you haven't organized anything yet.</h3>
                <Button
                  className="profile-events-not-organizer-button"
                  onClick={() =>
                    navigate("/create-event", {
                      replace: true,
                      state: { from: "/profile" },
                    })
                  }
                  sx={{
                    ":hover": { backgroundColor: "#f0f0f0", color: "black" },
                    backgroundColor: "#2f2e41",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    color: "white",
                    marginBottom: "2vh",
                    display: "flex",
                  }}
                >
                  Start organizing today
                </Button>
              </div>
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
          </>
        )}
        {}
        {}
      </div>
    </div>
  );
};
