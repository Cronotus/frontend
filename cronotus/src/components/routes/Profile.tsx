import "../../styles/profile.css";
import ProfileHead from "../ProfileHead";
import PorfileMyInformation from "../ProfilMyInformation";
import { deleteProfileFetch, useProfile } from "../../services/api/profile";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ProfileEdit from "../ProfileEdit";

interface CustomJwtPayload extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

const Profile = (props: { onLogout: () => void }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState<boolean>(false);

  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const userId =
    decodedToken?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  const { data: profileInfo, isLoading, error, mutate } = useProfile(userId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="profile-main-holder">
      {!isEditingProfile ? (
        <div className="profile-main-first-column">
          <ProfileHead
            profileInformation={profileInfo!}
            className="profile-head"
          />
          <PorfileMyInformation
            profileInformation={profileInfo!}
            className="profile-myinfos"
          />
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
      <div className="profile-main-first-column"></div>
      <div className="profile-main-second-column">
        <Button
          className="profile-delete-button"
          onClick={() => setDeleteProfileModal(!deleteProfileModal)}
          sx={{
            ":hover": { backgroundColor: "#2f2e41", color: "white" },
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            fontSize: "1.03rem",
            color: "black",
            marginBottom: "2vh",
          }}
        >
          Delete profile
        </Button>
        <Button
          className="profile-edit-button"
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          sx={{
            ":hover": { backgroundColor: "#2f2e41", color: "white" },
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            fontSize: "1.03rem",
            color: "black",
            marginBottom: "2vh",
          }}
        >
          Edit profile
        </Button>
        <Button
          className="profile-logout-button"
          onClick={props.onLogout}
          sx={{
            ":hover": { backgroundColor: "#2f2e41", color: "white" },
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            fontSize: "1.03rem",
            color: "black",
            marginBottom: "2vh",
          }}
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
                sx={{
                  ":hover": { backgroundColor: "#2f2e41", color: "white" },
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  fontSize: "1.03rem",
                  color: "black",
                  marginTop: "3.5vh",
                }}
              >
                Yes
              </Button>
              <Button
                className="profile-delete-button-no"
                onClick={() => setDeleteProfileModal(false)}
                sx={{
                  ":hover": { backgroundColor: "#2f2e41", color: "white" },
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  fontSize: "1.03rem",
                  color: "black",
                  marginTop: "3.5vh",
                }}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
