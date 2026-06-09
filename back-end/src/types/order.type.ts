export interface OrderItem {
  sku: string;
  qty: number;
}

export interface Order {
  order_id: string;
  status: string;
  amount: number;
  items: OrderItem[];
}