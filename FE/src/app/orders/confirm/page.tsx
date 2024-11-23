import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import Link from "next/link";
interface OrderConfirmPageProps {
  searchParams: {
    orderId: number;
    amount: number;
  };
}

const OrderConfirmPage = ({ searchParams }: OrderConfirmPageProps) => {
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
          🎉 Order Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your order has been successfully paid for. Thank you for shopping with
          us!
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6">Order Details</Typography>
          <Typography variant="body2">
            <strong>Order ID:</strong> {searchParams.orderId}
          </Typography>
          <Typography variant="body2">
            <strong>Amount Paid:</strong> {searchParams.amount} VND
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Link href={` /orders/${searchParams.orderId}`}>View Order</Link>
      </Paper>
    </Box>
  );
};

export default OrderConfirmPage;
