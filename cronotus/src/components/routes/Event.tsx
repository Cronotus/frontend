import { useParams } from "react-router-dom";
import { useEventDetail } from "../../services/api/events";
import "../../styles/browser.css";
import { formatDate } from "../../services/logic/formatDateForEvent";
import { useSport } from "../../services/api/sport";
import { Button } from "@mui/material";
import { checkIfPlayer } from "../../services/checkIfPlayer";
import {
  registerPlayerToEvent,
  resignPlayerFromEvent,
  useCheckPlayerRegistration,
} from "../../services/api/player";

export const SportsEvent = () => {
  const { id } = useParams();
  const { playerId } = checkIfPlayer();

  const {
    data: eventData,
    isLoading,
    error,
    mutate: eventDetailsMutate,
  } = useEventDetail(id!);

  const {
    data: sports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useSport(eventData?.sportId!);

  const {
    data: playerSignedUp,
    isLoading: playerSignedUpLoading,
    error: playerSignedUpError,
    mutate: mutatePlayerSignedUp,
  } = useCheckPlayerRegistration(eventData?.id!, playerId!);

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

  if (playerSignedUpLoading) {
    return <div>Loading...</div>;
  }

  if (playerSignedUpError) {
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
      <div className="events-signup-box">
        {!playerSignedUp?.isSignedUp ? (
          <Button
            className="event-signup-button"
            onClick={() => {
              const { playerId } = checkIfPlayer();
              registerPlayerToEvent(eventData?.id!, playerId)
                .then(() => mutatePlayerSignedUp())
                .then(() => eventDetailsMutate())
                .catch((err) => console.error(err));
            }}
            sx={{
              ":hover": { backgroundColor: "#f0f0f0", color: "black" },
              backgroundColor: "#2f2e41",
              borderRadius: "5px",
              fontSize: "0.9rem",
              color: "white",
              display: "flex",
              margin: "auto",
            }}
          >
            Sign me up to {eventData?.name}!
          </Button>
        ) : (
          <Button
            className="event-resign-button"
            onClick={() => {
              const { playerId } = checkIfPlayer();
              resignPlayerFromEvent(eventData?.id!, playerId)
                .then(() => mutatePlayerSignedUp())
                .then(() => eventDetailsMutate())
                .catch((err) => console.error(err));
            }}
            sx={{
              ":hover": { backgroundColor: "#f0f0f0", color: "black" },
              backgroundColor: "#2f2e41",
              borderRadius: "5px",
              fontSize: "0.9rem",
              color: "white",
              display: "flex",
              margin: "auto",
            }}
          >
            Resign me from {eventData?.name}
          </Button>
        )}
      </div>
    </div>
  );
};
