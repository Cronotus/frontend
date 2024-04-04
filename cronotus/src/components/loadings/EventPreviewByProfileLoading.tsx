import { Skeleton } from "@mui/material";

export const EventPreviewsByProfileLoading = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="96%"
        height={30}
        sx={{
          marginTop: "1vh",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="96%"
        height={70}
        sx={{
          marginTop: "1vh",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="96%"
        height={20}
        sx={{
          marginTop: "1vh",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="96%"
        height={60}
        sx={{
          marginTop: "1vh",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      />
    </>
  );
};
