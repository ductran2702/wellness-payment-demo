import { Box, CircularProgress, Typography } from "@mui/material";
export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Loading order details...
      </Typography>
    </Box>
  );
}
