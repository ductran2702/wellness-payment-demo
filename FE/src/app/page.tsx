"use client";
import { useQuery } from "@tanstack/react-query";
import fetchPaginatedData from "./api/getProducts";
import React, { ReactNode } from "react";
import MediaCard from "./components/ProductCard";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import PaginationComponent from "./components/Pagination";
export default function Home() {
  const theme = useTheme();
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await fetchPaginatedData(),
    queryKey: ["products"], //Array according to Documentation
    staleTime: Infinity,
  });

  var content: ReactNode;
  if (isLoading) {
    content = (
      <CircularProgress
        color="primary"
        size={60}
        thickness={2}
        sx={{
          marginTop: 16,
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />
    );
  } else if (isError || !data) {
    content = (
      <Typography
        variant="h6"
        color="error"
        sx={{
          marginTop: 16,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        Oops! Something went wrong.
      </Typography>
    );
  } else if (data) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            width: "100%",
          }}
        >
          {data.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    );
  } else {
    content = (
      <Typography variant="h6" align="center" sx={{ color: "gray", mt: 4 }}>
        No products available at the moment. Please try again later!
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        bgcolor: theme.palette.grey[100],
        minHeight: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: 4, pt: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.grey[800],
          }}
          gutterBottom
        >
          E-Store
        </Typography>
        <Typography variant="h5" sx={{ color: "gray" }}>
          See What Is Available
        </Typography>
      </Box>
      <PaginationComponent></PaginationComponent>
      {content}
    </Box>
  );
}
