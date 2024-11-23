import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { Order } from "@/types";
interface OrderDetailsPageProps {
  params: {
    id: string; // Dynamic route segment
  };
}
async function fetchOrderDetails(id: string): Promise<Order> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BE_HOST + `/orders/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }

  return await response.json();
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = params;
  let order: Order;
  try {
    order = await fetchOrderDetails(id);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f6f8",
          padding: 2,
        }}
      >
        <Typography color="error">
          Failed to load order details. Please try again later.
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: "100%",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          🎉{" "}
          {order.status === "confirmed" ? "Order Confirmed" : "Order Pending"}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {order.status === "confirmed"
            ? "Your order has been successfully paid for. Thank you for shopping with us!"
            : "Your payment is pending"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6">Order Details</Typography>
          <Typography variant="body2">
            <strong>Order ID:</strong> {order.order_id}
          </Typography>
          <Typography variant="body2">
            <strong>Amount Paid:</strong> {order.total} VND
          </Typography>
          <Typography variant="body2">
            <strong>Status:</strong> {order.status.toUpperCase()}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Paper>
    </Box>
  );
}
