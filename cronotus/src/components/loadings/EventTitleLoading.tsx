import { Skeleton } from "@mui/material";

export const EventTitleLoading = () => {
  return (
    <>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        width="100%"
        height={70}
        sx={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      />
    </>
  );
};
