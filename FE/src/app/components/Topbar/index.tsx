import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, clearCart } from "@/redux/slices/authSlice";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMutation } from "@tanstack/react-query";
import payWithMomo from "@/app/api/payWithMomo";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
export default function TopBar() {
  const router = useRouter();
  const { orderItems, total } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const totalItems = orderItems.reduce(
    (total, item) => item.quantity + total,
    0
  );
  // State for controlling the modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { status, mutateAsync } = useMutation({
    mutationFn: async (data: Cart) => {
      return await payWithMomo(data);
    },
  });

  const handlePay = async (): Promise<void> => {
    try {
      const data = await mutateAsync({
        orderItems,
        total,
      });
      window.location.href = data;
      localStorage.setItem("persist:cart", "");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="static" color="success">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "initial", md: "space-between" },
        }}
      >
        <Typography
          variant="h6"
          onClick={() => {
            router.push("/");
          }}
          component="div"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Momo Payment Demo
        </Typography>
        <IconButton
          onClick={handleOpen}
          color="primary"
          sx={{
            backgroundColor: "#f5f5f5",
            ":hover": {
              backgroundColor: "#e0e0e0",
            },
            padding: "8px",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Badge
            badgeContent={totalItems}
            color="warning"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.75rem", // Adjust the size of the badge
              },
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Your Cart</DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
            {orderItems.length > 0 ? (
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index}>
                    {item.product_name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No items in the cart.</Typography>
            )}
          </DialogContent>
          <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <Typography
              variant={"h6"}
              sx={{
                fontWeight: "bold",
                color: "success.main",
                fontSize: 16,
                textAlign: "right",
              }}
            >
              Total: {total.toFixed(0)} VND
            </Typography>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button
            onClick={() => {
              // Dispatch an action to clear the cart
              dispatch(clearCart());
            }}
            color="error"
          >
            Clear Cart
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={status === "pending" || total === 0}
            onClick={handlePay}
          >
            {status === "pending" ? (
              <CircularProgress size={24} color="info" />
            ) : (
              "Pay with Momo"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
