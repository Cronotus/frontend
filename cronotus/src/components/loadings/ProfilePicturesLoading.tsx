import { Skeleton } from "@mui/material";

export const ProfilePicturesLoading = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height="100px"
        sx={{ borderRadius: "20px", marginBottom: "1vw" }}
      />
    </>
  );
};
