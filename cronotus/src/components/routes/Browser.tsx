import "../../styles/browser.css";
import { EventPreview } from "../EventPreview";
import { useEventPreviews } from "../../services/api/events";
import { Link } from "react-router-dom";
import { EventPreviewLoading } from "../loadings/EventPreviewLoading";
import { Pagination } from "../../interfaces/Pagination";
import { Pagination as MUIPagination } from "@mui/material";
import { useState } from "react";

const Browser = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: eventPreviews,
    isLoading,
    error,
    paginationHeaders,
  } = useEventPreviews(currentPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const parsedPaginationHeaders: Pagination = paginationHeaders
    ? JSON.parse(paginationHeaders)
    : null;

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
        <div className="pagination-container">
          <MUIPagination
            count={parsedPaginationHeaders.TotalPages}
            variant="outlined"
            shape="rounded"
            color="secondary"
            siblingCount={2}
            onChange={handlePageChange}
            page={parsedPaginationHeaders.CurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Browser;
