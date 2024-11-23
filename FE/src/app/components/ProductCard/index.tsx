import { addItem } from "@/redux/slices/authSlice";
import { Product } from "@/types";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ProductCard = ({ item }: { item: Product }) => {
  const dispatch = useDispatch();
  const add = () => {
    dispatch(
      addItem({
        product_id: item.id,
        price: +item.price,
        product_name: item.name,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{ position: "relative", aspectRatio: "16 / 9", bgcolor: "white" }}
      >
        <Image
          draggable={false}
          src={"/images/dummy-product.jpg"}
          alt={"Dummy products"}
          layout="fill"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/error.png"; // Fallback to error image
            (e.target as HTMLImageElement).style.objectFit = "contain";
          }}
          objectFit="cover"
        />
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {item?.name && (
          <Tooltip title={item.name} arrow placement="bottom-start">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.name}
            </Typography>
          </Tooltip>
        )}
        {item?.description && (
          <Tooltip title={item.description} arrow placement="bottom-start">
            <Typography
              variant="subtitle2"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.description}
            </Typography>
          </Tooltip>
        )}
        <Typography component={"span"} sx={{ fontSize: 12, color: "#e73473" }}>
          {item.price} VND
        </Typography>
      </Box>
      <IconButton
        onClick={add}
        color="primary"
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
          backgroundColor: "#f5f5f5",
          ":hover": {
            backgroundColor: "#e0e0e0",
          },
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AddShoppingCartIcon />
      </IconButton>
    </Box>
  );
};
export default ProductCard;
