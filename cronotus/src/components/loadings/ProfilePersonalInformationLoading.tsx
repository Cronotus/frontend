import { Skeleton } from "@mui/material";

export const ProfilePersonalInformationLoading = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="pulse"
        width="100%"
        height="100px"
        sx={{ marginTop: "3vh", borderRadius: 5 }}
      />
    </>
  );
};
