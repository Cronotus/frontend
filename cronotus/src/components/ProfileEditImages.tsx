import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../styles/profile.css";
import { useEffect, useState } from "react";
import { updateProfileCoverImageFetch } from "../services/updateProfileCoverImageFetch";
import { getUserId } from "../services/logic/getUserId";
import { updateProfilePictureFetch } from "../services/updateProfilePictureFetch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ProfileInformation } from "../interfaces/in/ProfileInformation";
import {
  deleteProfileCoverImageFetch,
  deleteProfilePictureFetch,
} from "../services/api/profile";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ProfileEditImages = (props: {
  swrMutate: Promise<any>;
  setProfileIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  profileInfo: ProfileInformation;
}) => {
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCoverImage(file);
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (newCoverImage) {
      updateProfileCoverImageFetch({
        id: userId,
        file: newCoverImage,
      })
        .then(() => props.swrMutate)
        .then(() => props.setProfileIsEditing(false));
    }
  }, [newCoverImage]);

  useEffect(() => {
    const userId = getUserId();
    if (newProfilePicture) {
      updateProfilePictureFetch({
        id: userId,
        file: newProfilePicture,
      })
        .then(() => props.swrMutate)
        .then(() => props.setProfileIsEditing(false));
    }
  }, [newProfilePicture]);

  const handleCoverImageDeleteButtonPress = () => {
    if (props.profileInfo.profileCoverImage) {
      const userId = getUserId();
      deleteProfileCoverImageFetch(userId)
        .then(() => props.swrMutate)
        .then(() => props.setProfileIsEditing(false));
    } else {
      alert("No cover image to delete");
    }
  };

  const handleProfilePictureDeleteButtonPress = () => {
    if (props.profileInfo.profilePicture) {
      const userId = getUserId();
      deleteProfilePictureFetch(userId)
        .then(() => props.swrMutate)
        .then(() => props.setProfileIsEditing(false));
    } else {
      alert("No profile picture to delete");
    }
  };

  return (
    <div className="profile-edit-images-main-holder">
      <div className="profile-new-images-container">
        <label htmlFor="cover-image">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            role={undefined}
            tabIndex={-1}
            sx={{
              ":hover": { backgroundColor: "#f0f0f0", color: "black" },
              backgroundColor: "#2f2e41",
              borderRadius: "5px",
              fontSize: "0.9rem",
              color: "white",
              display: "flex",
            }}
          >
            New cover image
            <VisuallyHiddenInput
              type="file"
              id="cover-image"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
          </Button>
        </label>

        <label htmlFor="profile-picture">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            role={undefined}
            tabIndex={-1}
            sx={{
              ":hover": { backgroundColor: "#f0f0f0", color: "black" },
              backgroundColor: "#2f2e41",
              borderRadius: "5px",
              fontSize: "0.9rem",
              color: "white",
              display: "flex",
            }}
          >
            New profile picture
            <VisuallyHiddenInput
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </Button>
        </label>
      </div>
      <div className="profile-delete-images-container">
        <Button
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          onClick={handleCoverImageDeleteButtonPress}
          sx={{
            ":hover": { backgroundColor: "#f0f0f0", color: "black" },
            backgroundColor: "#2f2e41",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "white",
            display: "flex",
          }}
        >
          Delete cover image
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          onClick={handleProfilePictureDeleteButtonPress}
          sx={{
            ":hover": { backgroundColor: "#f0f0f0", color: "black" },
            backgroundColor: "#2f2e41",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "white",
            display: "flex",
          }}
        >
          Delete profile picture
        </Button>
      </div>
    </div>
  );
};
