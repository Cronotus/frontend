export const ProfilePictureFullscreenModalContent = (props: {
  profilePictureURI: string | undefined;
}) => {
  return (
    <img
      src={props.profilePictureURI}
      alt="profile-picture-fullscreen"
      className="profile-picture-fullscreen-modal-content"
    />
  );
};
