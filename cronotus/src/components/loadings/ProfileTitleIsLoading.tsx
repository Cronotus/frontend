import { Skeleton } from "@mui/material";

export const ProfileTitleIsLoading = () => {
  return (
    <>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        width="100%"
        height="50px"
        sx={{ marginTop: "1vh", borderRadius: 5 }}
      />
    </>
  );
};
