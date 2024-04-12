import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEventFetch,
  deltePictureForEventFetch,
  useCheckIfPlayerIsSignedUp,
  useEventDetail,
  useEventPictures,
} from "../../services/api/events";
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
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useRef, useState } from "react";
import { Button, Modal } from "@mui/material";
import { useProfileByOrganizerId } from "../../services/api/profile";
import { ProfilePictures } from "../ProfilePictures";
import { CoverImageFullscreenModalContent } from "../CoverImageFullscreenModalContent";
import { ProfilePictureFullscreenModalContent } from "../ProfilePictureFullscreenModalContent";
import { getOrganizerId } from "../../services/logic/getOrganizerId";
import { EventPictureForReturn } from "../../interfaces/in/EventPictureForReturn";
import { VisuallyHiddenInput } from "../ProfileEditImages";
import { uploadPicturesForEventFetch } from "../../services/uploadPicturesForEventFetch";
import { getPlayerId } from "../../services/logic/getPlayerId";
import { ClearIcon } from "@mui/x-date-pickers";
import {
  registerPlayerToEvent,
  resignPlayerFromEvent,
} from "../../services/api/player";

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
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState<boolean>(false);
  const [currentFullscreenEventPicture, setCurrentFullscreenEventPicture] =
    useState<string>("");
  const [
    currentFullscreenEventPictureModalVisible,
    setCurrentFullscreenEventPictureModalVisible,
  ] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const userPlayerId = getPlayerId();
  const {
    data: eventData,
    isLoading,
    error,
    mutate: eventDataMutate,
  } = useEventDetail(id!);
  const {
    data: eventOrganizerData,
    isLoading: organizerIsLoading,
    error: organizerError,
  } = useProfileByOrganizerId(eventData?.organizerId!);
  const {
    data: eventPictures,
    isLoading: eventPicturesIsLoading,
    mutate: eventPicturesMutate,
    error: eventPicturesError,
  } = useEventPictures(id!);
  const {
    data: playerIsSignedUpToEventData,
    isLoading: playerIsSignedUpToEventIsLoading,
    error: playerIsSignedUpToEventError,
    mutate: playerIsSignedUpToEventMutate,
  } = useCheckIfPlayerIsSignedUp({ eventId: id!, playerId: userPlayerId });

  const userOrganizerId = getOrganizerId();

  const eventDetailImagesContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (eventDetailImagesContainerRef.current) {
      eventDetailImagesContainerRef.current.scrollBy({
        left: -1200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (eventDetailImagesContainerRef.current) {
      eventDetailImagesContainerRef.current.scrollBy({
        left: 1200,
        behavior: "smooth",
      });
    }
  };

  const handleEventPictureUploads = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      if (filesArray.length > 0) {
        uploadPicturesForEventFetch({ eventId: id!, files: filesArray })
          .then(() => eventPicturesMutate())
          .catch(() => alert("There was an error uploading the pictures"));
      }
    }
  };

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (organizerError) {
    return <div>Something went wrong...</div>;
  }

  if (eventPicturesError) {
    return <div>Something went wrong...</div>;
  }

  if (playerIsSignedUpToEventError) {
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

        {eventPictures?.length === 0 ? (
          <div className="event-detail-images-holder-empty">
            {userOrganizerId === eventData?.organizerId ? (
              <h3>
                Look like you haven't uploaded any pictures yet... Do it now?
              </h3>
            ) : (
              <h3>
                Looks like this event doesn't have any pictures yet. Come back
                in a little bit!{" "}
              </h3>
            )}
          </div>
        ) : (
          <div className="event-detail-images-holder">
            <div className="event-detail-images-title-and-buttons">
              <h3>Pictures about this event</h3>
              <div className="event-detail-scroll-buttons-holder">
                <Button
                  className="event-scroll-left-button"
                  startIcon={<WestIcon />}
                  onClick={handleScrollLeft}
                  sx={{
                    ":hover": { backgroundColor: "#f0f0f0", color: "black" },
                    backgroundColor: "#2f2e41",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    color: "white",
                    marginBottom: "2vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "1vh",
                  }}
                />
                <Button
                  className="event-scroll-right-button"
                  startIcon={<EastIcon />}
                  onClick={handleScrollRight}
                  sx={{
                    ":hover": { backgroundColor: "#f0f0f0", color: "black" },
                    backgroundColor: "#2f2e41",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    color: "white",
                    marginBottom: "2vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
            </div>
            <div
              className="event-detail-images-container"
              ref={eventDetailImagesContainerRef}
            >
              {userOrganizerId === eventData?.organizerId
                ? eventPictures?.map((eventPicture: EventPictureForReturn) => (
                    <div className="event-detail-picture-slideshow-component-holder">
                      <img
                        key={eventPicture.id}
                        src={eventPicture.pictureUrl}
                        alt="Event picture"
                        className="event-detail-picture-slideshow-component-for-organizer"
                        onClick={() => {
                          setCurrentFullscreenEventPicture(
                            eventPicture.pictureUrl
                          );
                          setCurrentFullscreenEventPictureModalVisible(true);
                        }}
                      />
                      <DeleteIcon
                        id="delete-image-for-organizer-icon"
                        onClick={() =>
                          deltePictureForEventFetch({
                            eventId: eventData.id,
                            pictureId: eventPicture.id,
                          })
                            .then(() => eventPicturesMutate())
                            .catch(() =>
                              alert("There was an error deleting the picture")
                            )
                        }
                        sx={{
                          fontSize: "3rem",
                          backgroundColor: "#cfcfcf",
                          borderRadius: "5px",
                          color: "black",
                          ":hover": {
                            backgroundColor: "#E72929",
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  ))
                : eventPictures?.map((eventPicture: EventPictureForReturn) => (
                    <img
                      key={eventPicture.id}
                      src={eventPicture.pictureUrl}
                      alt="Event picture"
                      className="event-detail-picture-slideshow-component"
                      onClick={() => {
                        setCurrentFullscreenEventPicture(
                          eventPicture.pictureUrl
                        );
                        setCurrentFullscreenEventPictureModalVisible(true);
                      }}
                    />
                  ))}
            </div>
          </div>
        )}

        <div className="events-signup-box">
          {playerIsSignedUpToEventData?.isSignedUp === false ? (
            <Button
              className="events-modify-for-owner-edit-button"
              type="submit"
              startIcon={<CheckIcon />}
              onClick={() => {
                registerPlayerToEvent(eventData!.id, userPlayerId)
                  .then(() => playerIsSignedUpToEventMutate())
                  .then(() => eventDataMutate())
                  .catch(() => alert("Could not sign up to event"));
              }}
              sx={{
                ":hover": { backgroundColor: "#82CD47", color: "white" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                display: "flex",
              }}
            >
              Sign me up to this event!
            </Button>
          ) : (
            <Button
              className="events-modify-for-owner-edit-button"
              type="submit"
              startIcon={<ClearIcon />}
              onClick={() => {
                resignPlayerFromEvent(id!, userPlayerId)
                  .then(() => playerIsSignedUpToEventMutate())
                  .then(() => eventDataMutate())
                  .catch((err) => console.log(err));
              }}
              sx={{
                ":hover": { backgroundColor: "#e72929", color: "white" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                display: "flex",
              }}
            >
              Resign me from this event
            </Button>
          )}
        </div>

        {userOrganizerId === eventData?.organizerId ? (
          <div className="events-modify-for-owner-holder-div">
            <h3>Modify your event</h3>
            <Button
              className="events-modify-for-owner-edit-button"
              type="submit"
              startIcon={<EditIcon />}
              onClick={() => alert("I'm not implemented yet")}
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
              Change event details
            </Button>
            <label htmlFor="add-some-images-tag">
              <Button
                className="events-modify-for-owner-edit-button"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                tabIndex={-1}
                role={undefined}
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
                Add some pictures
                <VisuallyHiddenInput
                  type="file"
                  id="add-some-images-tag"
                  accept="image/*"
                  multiple
                  onChange={handleEventPictureUploads}
                />
              </Button>
            </label>

            <Button
              className="events-modify-for-owner-delete-button"
              type="submit"
              startIcon={<DeleteIcon />}
              onClick={() => setConfirmDeleteModalVisible(true)}
              sx={{
                ":hover": { backgroundColor: "#E72929", color: "white" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                marginBottom: "2vh",
                display: "flex",
              }}
            >
              Delete this event
            </Button>
          </div>
        ) : null}
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

              <div className="event-organizer-info-name">
                <Person4Icon sx={{ marginRight: "1vh" }} />
                <h3>
                  {eventOrganizerData?.firstName}&nbsp;
                  {eventOrganizerData?.lastName}, also known as{" "}
                  {eventOrganizerData?.userName}
                </h3>
              </div>
              <div className="event-organizer-info-name">
                <AlternateEmailIcon sx={{ marginRight: "1vh" }} />
                <h3>{eventOrganizerData?.email}</h3>
              </div>
              <div className="event-organizer-info-name">
                <LocalPhoneIcon sx={{ marginRight: "1vh" }} />
                <h3>{eventOrganizerData?.phoneNumber}</h3>
              </div>
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
      <Modal
        open={currentFullscreenEventPictureModalVisible}
        onClose={() => setCurrentFullscreenEventPictureModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CoverImageFullscreenModalContent
          coverImageURI={currentFullscreenEventPicture}
        />
      </Modal>
      <Modal
        open={confirmDeleteModalVisible}
        onClose={() => setConfirmDeleteModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="event-delete-modal-inside-holder">
          <h3>
            Are you sure you want to delete this event? This action cannot be
            reversed.
          </h3>
          <div className="event-delete-modal-inside-buttons-holder">
            <Button
              className="events-modify-for-owner-delete-button"
              type="submit"
              startIcon={<CheckIcon />}
              onClick={() =>
                deleteEventFetch(eventData!.id)
                  .then(() => navigate("/browser"))
                  .catch(() => alert("Could not delete event"))
              }
              sx={{
                ":hover": { backgroundColor: "#E72929", color: "white" },
                backgroundColor: "#2f2e41",
                borderRadius: "5px",
                fontSize: "0.9rem",
                color: "white",
                marginBottom: "2vh",
                display: "flex",
              }}
            >
              Yes, delete this event!
            </Button>
            <Button
              className="events-modify-for-owner-delete-button"
              type="submit"
              startIcon={<DoNotDisturbAltIcon />}
              onClick={() => setConfirmDeleteModalVisible(false)}
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
              No, keep this event.
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
