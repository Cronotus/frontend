import { Skeleton } from "@mui/material";

export const EventLoading = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="40%"
        height={45}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="60%"
        height={80}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="80%"
        height={50}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="50%"
        height={100}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="70%"
        height={30}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="30%"
        height={150}
        sx={{ marginTop: "1vh" }}
      />
      <Skeleton
        variant="rounded"
        animation="pulse"
        width="50%"
        height={30}
        sx={{ marginTop: "1vh" }}
      />
    </>
  );
};
