import "../../styles/browser.css";
import { EventPreview } from "../EventPreview";
import { useState } from "react";
import { useEventPreviews } from "../../services/api/events";
import { Link } from "react-router-dom";

const Browser = () => {
  const [eventInDetail, setEventInDetail] = useState<string | null>(null);

  const { data: eventPreviews, isLoading, error } = useEventPreviews();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <div className="browser-main-holder">
        <div className="browser-header">
          <h1>See what others are up to</h1>
        </div>
        <div className="browser-body">
          {eventPreviews!.length === 0 && (
            <h1>Looks like there's nothing going on currently</h1>
          )}
          {eventPreviews!.map((eventPreview) => (
            <Link
              className="event-preview-link"
              to={{
                pathname: `/event/${eventPreview.id}`,
              }}
              state={eventPreview.id}
            >
              <EventPreview key={eventPreview.id} event={eventPreview} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browser;
