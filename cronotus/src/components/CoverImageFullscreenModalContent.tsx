import "../styles/profile.css";

export const CoverImageFullscreenModalContent = (props: {
  coverImageURI: string | undefined;
}) => {
  return (
    <img
      src={props.coverImageURI}
      alt="cover-image-fullscreen"
      className="cover-image-fullscreen-modal-content"
    />
  );
};
