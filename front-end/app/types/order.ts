export interface OrderItem {
  sku: string;
  qty: number;
}

export interface Order {
  order_id: string;
  status: "paid" | "pending" | "failed" | "refunded";
  amount: number;
  items: OrderItem[];
}

export interface OrderStats {
  total: number;
  revenue: number;
  confirmed: number;
  pending: number;
}