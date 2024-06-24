import { ProfileInformation } from "../interfaces/in/ProfileInformation";
import { ProfilePicturesLoading } from "./loadings/ProfilePicturesLoading";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ProfilePictures = (props: {
  profileInfo: ProfileInformation | undefined;
  isLoading: boolean;
  setCoverImageFullscreenModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setProfilePictureFullscreenModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  return props.isLoading ? (
    <ProfilePicturesLoading />
  ) : (
    <div className="profile-pictures-holder">
      {props.profileInfo?.profileCoverImage ? (
        <div
          className="cover-image-holder"
          onClick={props.setCoverImageFullscreenModalVisible.bind(this, true)}
        >
          <img
            className="profile-cover-image"
            src={props.profileInfo?.profileCoverImage}
            alt="profile-cover-image"
          />
        </div>
      ) : (
        <div className="cover-image-holder-no-image"></div>
      )}
      {props.profileInfo?.profilePicture ? (
        <img
          onClick={props.setProfilePictureFullscreenModalVisible.bind(
            this,
            true
          )}
          id="profile-picture-img"
          src={props.profileInfo?.profilePicture}
          alt="profile-picture"
        />
      ) : (
        <AccountCircleIcon id="profile-picture-img-no-image" />
      )}
    </div>
  );
};
