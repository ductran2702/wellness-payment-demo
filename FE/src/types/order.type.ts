import { OrderItem } from "./order-item.type";

export interface Order {
  order_id: number;
  status: "pending" | "confirmed" | "cancelled";
  total: number;
  created_at: Date;
  items: OrderItem[];
}
