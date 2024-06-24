import "../../styles/browser.css";
import { EventPreview } from "../EventPreview";
import { useEventPreviews } from "../../services/api/events";
import { Link } from "react-router-dom";
import { EventPreviewLoading } from "../loadings/EventPreviewLoading";
import { Pagination } from "../../interfaces/Pagination";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as MUIPagination,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useSports } from "../../services/api/sport";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Browser = () => {
  const [filteringContainerOpen, setFilteringContainerOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterSport, setFilterSport] = useState<string | null>(null);
  const {
    data: eventPreviews,
    isLoading,
    error,
    paginationHeaders,
    mutate: mutateEventPreviews,
  } = useEventPreviews(currentPage, {
    startDate: filterStartDate,
    endDate: filterEndDate,
    sportId: filterSport,
  });

  const {
    data: sports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useSports();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (sportsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (sportsError) {
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

        <div className="filtering-container-header">
          <h2 className="filtering-container-title">
            Looking for something specific?
          </h2>
          {filteringContainerOpen ? (
            <Button
              startIcon={<ArrowDropUpIcon />}
              sx={{
                ":hover": { backgroundColor: "#f0f0f0", color: "black" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                display: "flex",
                marginBottom: "1%",
              }}
              onClick={() => setFilteringContainerOpen(false)}
            ></Button>
          ) : (
            <Button
              startIcon={<ArrowDropDownIcon />}
              sx={{
                ":hover": { backgroundColor: "#f0f0f0", color: "black" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                display: "flex",
                marginBottom: "1%",
              }}
              onClick={() => setFilteringContainerOpen(true)}
            ></Button>
          )}
        </div>
        <div
          className={
            filteringContainerOpen ? "filtering-container" : "not-visible-div"
          }
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="filterin-container-holder">
              <DatePicker
                label="Select a start date"
                value={filterStartDate}
                onChange={(newVal) => setFilterStartDate(newVal)}
              />
              <DatePicker
                label="Select an end date"
                value={filterEndDate}
                onChange={(newVal) => setFilterEndDate(newVal)}
              />
              <FormControl
                sx={{ width: "auto", marginBottom: "1vh", minWidth: "15%" }}
              >
                <InputLabel id="event-create-sport-labelid">Sport</InputLabel>
                <Select
                  labelId="event-create-sport-labelid"
                  id="event-create-sport"
                  value={filterSport}
                  label="Sport"
                  onChange={(newVal) =>
                    setFilterSport(newVal.target.value as string)
                  }
                >
                  {sports!.map((sport) => (
                    <MenuItem key={sport.id} value={sport.id}>
                      {sport.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </LocalizationProvider>
          <Button
            type="submit"
            onClick={() => {
              setFilterStartDate(null);
              setFilterEndDate(null);
              setFilterSport(null);
              setCurrentPage(1);
              mutateEventPreviews();
            }}
            startIcon={<FilterAltOffIcon />}
            sx={{
              ":hover": { backgroundColor: "#e72929", color: "white" },
              backgroundColor: "#2f2e41",
              borderRadius: "5px",
              fontSize: "0.9rem",
              color: "white",
              display: "flex",
              marginBottom: "1%",
            }}
          >
            Clear filters!
          </Button>
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
