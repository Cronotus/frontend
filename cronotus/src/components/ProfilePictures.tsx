import { ProfileInformation } from "../interfaces/in/ProfileInformation";
import { ProfilePicturesLoading } from "./loadings/ProfilePicturesLoading";

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
      <img
        onClick={props.setProfilePictureFullscreenModalVisible.bind(this, true)}
        id="profile-picture-img"
        src={props.profileInfo?.profilePicture}
        alt="profile-picture"
      />
    </div>
  );
};
