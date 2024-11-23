import React from "react";
import { Box, FormControl, TextField } from "@mui/material";

const PaginationComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: {
          xs: "column",
          md: "row",
        },

        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <TextField
          label="Search Products"
          size="small"
          value={""}
          onChange={(e) => {}}
          variant="outlined"
        />
      </FormControl>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginLeft: { md: "auto" },
        }}
      ></Box>
    </Box>
  );
};
export default PaginationComponent;
