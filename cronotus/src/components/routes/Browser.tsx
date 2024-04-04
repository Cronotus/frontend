import "../../styles/browser.css";
import { EventPreview } from "../EventPreview";
import { useEventPreviews } from "../../services/api/events";
import { Link } from "react-router-dom";
import { EventPreviewLoading } from "../loadings/EventPreviewLoading";

const Browser = () => {
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
          <Link
            id="browser-link"
            to={{
              pathname: "/browser",
            }}
          >
            <h1>See what others are up to</h1>
          </Link>
          <Link
            id="browser-link"
            to={{
              pathname: "/create-event",
            }}
          >
            <h1>Create a new event</h1>
          </Link>
        </div>
        <div className="browser-body">
          {isLoading ? (
            <>
              <EventPreviewLoading />
            </>
          ) : (
            eventPreviews!.map((eventPreview) => (
              <Link
                className="event-preview-link"
                to={{
                  pathname: `/event/${eventPreview.id}`,
                }}
                state={eventPreview.id}
              >
                <EventPreview key={eventPreview.id} event={eventPreview} />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Browser;
