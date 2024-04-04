import { Skeleton } from "@mui/material";

export const EventPreviewLoading = () => {
  return (
    <>
      <Skeleton variant="text" animation="pulse" width="40%" height={40} />
      <Skeleton animation="pulse" variant="rounded" width="100%" height={40} />
      <Skeleton
        animation="pulse"
        variant="text"
        width="80%"
        height={180}
        sx={{ margin: 0, padding: 0 }}
      />
      <Skeleton variant="text" animation="pulse" width="40%" height={40} />
      <Skeleton animation="pulse" variant="rounded" width="100%" height={40} />
      <Skeleton
        animation="pulse"
        variant="text"
        width="80%"
        height={180}
        sx={{ margin: 0, padding: 0 }}
      />
    </>
  );
};
