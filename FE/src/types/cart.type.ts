import { CartItem } from "./cart-item.type";

export interface Cart {
  total: number;
  orderItems: CartItem[];
}
