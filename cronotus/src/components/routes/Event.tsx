import { useParams } from "react-router-dom";
import { useEventDetail } from "../../services/api/events";
import "../../styles/browser.css";
import { formatDate } from "../../services/logic/formatDateForEvent";
import { EventTitleLoading } from "../loadings/EventTitleLoading";
import { EventLoading } from "../loadings/EventLoading";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import SportsVolleyballOutlinedIcon from "@mui/icons-material/SportsVolleyballOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";

export const SportsEvent = () => {
  const { id } = useParams();

  const { data: eventData, isLoading, error } = useEventDetail(id!);

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="browser-main-holder">
      {isLoading ? (
        <EventTitleLoading />
      ) : (
        <div className="browser-header">
          <h1>{eventData?.name}</h1>
        </div>
      )}

      <div className="events-detail-body">
        {isLoading ? (
          <EventLoading />
        ) : (
          <>
            <div className="events-detail-body-description">
              <DescriptionOutlinedIcon sx={{ marginRight: "1vh" }} />
              <h3>{eventData?.description}</h3>
            </div>

            <div className="events-detail-body-description">
              <LocationOnOutlinedIcon sx={{ marginRight: "1vh" }} />
              <h3>{eventData?.location}</h3>
            </div>

            <div className="events-detail-body-description">
              <TodayOutlinedIcon sx={{ marginRight: "1vh" }} />
              <h3>{formatDate(eventData?.startDate!)}</h3>
            </div>

            <div className="events-detail-body-description">
              <SportsVolleyballOutlinedIcon sx={{ marginRight: "1vh" }} />
              <h3>{eventData?.sportName}</h3>
            </div>

            {(((eventData?.signedUpPlayers as unknown as number) <
              eventData?.capacity!) as unknown as number) ? (
              <div className="events-detail-body-description">
                <EmojiPeopleOutlinedIcon sx={{ marginRight: "1vh" }} />
                <h3>
                  {eventData?.signedUpPlayers} / {eventData?.capacity}
                </h3>
              </div>
            ) : (
              <div className="events-detail-body-description">
                <Groups3OutlinedIcon sx={{ marginRight: "1vh" }} />
                <h3>
                  {eventData?.signedUpPlayers} / {eventData?.capacity}
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
