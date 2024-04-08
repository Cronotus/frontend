import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../styles/profile.css";

const VisuallyHiddenInput = styled("input")({
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

export const ProfileEditImages = () => {
  return (
    <div className="profile-new-images-container">
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        role={undefined}
      >
        New cover image
        <VisuallyHiddenInput type="file" accept="image/*" id="cover-image" />
      </Button>
    </div>
  );
};
