import "../../styles/profile.css";
import ProfileHead from "../ProfileHead";
import PorfileMyInformation from "../ProfilMyInformation";
import { deleteProfileFetch, useProfile } from "../../services/api/profile";
import { jwtDecode } from "jwt-decode";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ProfileEdit from "../ProfileEdit";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import {
  deleteProfileAnswerButtonStyle,
  deleteProfileButtonStyle,
  editProfileButtonStyle,
  logoutButtonStyle,
  modalBoxStyle,
} from "../../styles/profileStyles";
import { ProfileMyEvents } from "../ProfileMyEvents";
import { checkForTokens } from "../../services/provideTokens";
import { useNavigate } from "react-router-dom";
import { ProfilePersonalInformationLoading } from "../loadings/ProfilePersonalInformationLoading";
import { ProfileTitleIsLoading } from "../loadings/ProfileTitleIsLoading";
import { ProfilePictures } from "../ProfilePictures";
import { CoverImageFullscreenModalContent } from "../CoverImageFullscreenModalContent";
import { ProfilePictureFullscreenModalContent } from "../ProfilePictureFullscreenModalContent";

const Profile = (props: { onLogout: () => void }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false);
  const [
    coverImageFullscreenModalVisible,
    setCoverImageFullscreenModalVisible,
  ] = useState<boolean>(false);
  const [
    profilePictureFullscreenModalVisible,
    setProfilePictureFullscreenModalVisible,
  ] = useState<boolean>(false);

  const navigate = useNavigate();

  const { accessToken } = checkForTokens();

  const profileIdKeyName = import.meta.env.VITE_LOCAL_JWT_TOKEN_ID_KEY;

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken as string)
    : null;

  const userId = decodedToken?.[profileIdKeyName];
  const organizerId =
    (decodedToken?.["OrganizerNameIdentifier"] as string) || null;

  const { data: profileInfo, isLoading, error, mutate } = useProfile(userId!);

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <div className="profile-main-holder">
        {!isEditingProfile ? (
          <div className="profile-main-first-column">
            <ProfilePictures
              profileInfo={profileInfo}
              isLoading={isLoading}
              setCoverImageFullscreenModalVisible={
                setCoverImageFullscreenModalVisible
              }
              setProfilePictureFullscreenModalVisible={
                setProfilePictureFullscreenModalVisible
              }
            />
            {isLoading ? (
              <ProfileTitleIsLoading />
            ) : (
              <ProfileHead
                profileInformation={profileInfo!}
                className="profile-head"
              />
            )}

            {isLoading ? (
              <ProfilePersonalInformationLoading />
            ) : (
              <PorfileMyInformation
                profileInformation={profileInfo!}
                className="profile-myinfos"
              />
            )}

            {organizerId ? (
              <ProfileMyEvents
                className="profile-myevents"
                organizerId={organizerId}
              />
            ) : (
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
          </div>
        ) : (
          <div className="profile-main-first-column">
            <ProfileEdit
              className="profile-edit"
              userId={userId!}
              mutateData={mutate}
              prevValues={profileInfo!}
              profileIsEditing={isEditingProfile}
              setProfileIsEditing={setIsEditingProfile}
            />
          </div>
        )}
        <div className="profile-main-second-column">
          <Button
            className="profile-delete-button"
            onClick={() => setDeleteProfileModal(!deleteProfileModal)}
            sx={deleteProfileButtonStyle}
          >
            Delete profile
          </Button>
          <Button
            className="profile-edit-button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            sx={editProfileButtonStyle}
          >
            Edit profile
          </Button>
          <Button
            className="profile-logout-button"
            onClick={props.onLogout}
            sx={logoutButtonStyle}
          >
            Log out
          </Button>
          <Modal
            open={deleteProfileModal}
            onClose={() => setDeleteProfileModal(false)}
          >
            <Box sx={modalBoxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sad to see you go, {profileInfo?.firstName}! Sure about this?
              </Typography>
              <div className="delte-profile-modal-answer-holder">
                <Button
                  className="profile-delete-button-yes"
                  onClick={() => {
                    deleteProfileFetch(userId!).catch((err) =>
                      console.log("some error during profile deletion", err)
                    );
                    props.onLogout();
                  }}
                  sx={deleteProfileAnswerButtonStyle}
                >
                  Yes
                </Button>
                <Button
                  className="profile-delete-button-no"
                  onClick={() => setDeleteProfileModal(false)}
                  sx={deleteProfileAnswerButtonStyle}
                >
                  No
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <Modal
        open={coverImageFullscreenModalVisible}
        onClose={() => setCoverImageFullscreenModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CoverImageFullscreenModalContent
          coverImageURI={profileInfo?.profileCoverImage}
        />
      </Modal>
      <Modal
        open={profilePictureFullscreenModalVisible}
        onClose={() => setProfilePictureFullscreenModalVisible(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfilePictureFullscreenModalContent
          profilePictureURI={profileInfo?.profilePicture}
        />
      </Modal>
    </>
  );
};

export default Profile;
