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
import Person4Icon from "@mui/icons-material/Person4";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Modal } from "@mui/material";
import { useProfileByOrganizerId } from "../../services/api/profile";
import { ProfilePictures } from "../ProfilePictures";
import { CoverImageFullscreenModalContent } from "../CoverImageFullscreenModalContent";
import { ProfilePictureFullscreenModalContent } from "../ProfilePictureFullscreenModalContent";

export const SportsEvent = () => {
  const [eventOrganizerInfoModalVisible, setEventOrganizerInfoModalVisible] =
    useState<boolean>(false);
  const [
    eventOrganizerCoverImageModalVisible,
    setEventOrganizerCoverImageModalVisible,
  ] = useState<boolean>(false);
  const [
    eventOrganizerProfilePictureModalVisible,
    setEventOrganizerProfilePictureModalVisible,
  ] = useState<boolean>(false);

  const { id } = useParams();
  const { data: eventData, isLoading, error } = useEventDetail(id!);
  const {
    data: eventOrganizerData,
    isLoading: organizerIsLoading,
    error: organizerError,
  } = useProfileByOrganizerId(eventData?.organizerId!);

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (organizerError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <div className="browser-main-holder">
        {isLoading ? (
          <EventTitleLoading />
        ) : (
          <div className="browser-header">
            <h1>{eventData?.name}</h1>
          </div>
        )}

        <div className="events-detail-organaizer-name">
          <Person4Icon sx={{ marginRight: "1vh" }} />
          <h3>
            Organized by{" "}
            <span
              id="organizer-name-event-detail"
              onClick={() => setEventOrganizerInfoModalVisible(true)}
            >
              {eventData?.organizerName}
            </span>
          </h3>
        </div>

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
      <Modal
        open={eventOrganizerInfoModalVisible}
        onClose={() => setEventOrganizerInfoModalVisible(false)}
        sx={{
          overflow: "scroll",
        }}
      >
        <>
          <div className="event-organizer-info-modal-holder">
            <div className="event-organizer-info-modal-header">
              <h2>{eventOrganizerData?.userName}'s profile</h2>
              <div
                className="close-icon-box"
                onClick={() => setEventOrganizerInfoModalVisible(false)}
              >
                <CloseIcon
                  sx={{ fontSize: "1.8rem" }}
                  onClick={() => setEventOrganizerInfoModalVisible(false)}
                />
              </div>
            </div>
            <div className="event-organizer-info-body">
              <ProfilePictures
                profileInfo={eventOrganizerData}
                isLoading={organizerIsLoading}
                setCoverImageFullscreenModalVisible={
                  setEventOrganizerCoverImageModalVisible
                }
                setProfilePictureFullscreenModalVisible={
                  setEventOrganizerProfilePictureModalVisible
                }
              />
            </div>
          </div>
        </>
      </Modal>
      <Modal
        open={eventOrganizerCoverImageModalVisible}
        onClose={() => setEventOrganizerCoverImageModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CoverImageFullscreenModalContent
          coverImageURI={eventOrganizerData?.profileCoverImage}
        />
      </Modal>
      <Modal
        open={eventOrganizerProfilePictureModalVisible}
        onClose={() => setEventOrganizerProfilePictureModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfilePictureFullscreenModalContent
          profilePictureURI={eventOrganizerData?.profilePicture}
        />
      </Modal>
    </>
  );
};
