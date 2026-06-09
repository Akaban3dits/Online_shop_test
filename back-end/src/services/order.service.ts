import { inventory } from "../data/inventory";
import { orders } from "../data/orders";
import type { Order } from "../types/order.type";

export const processOrder = (order: Order) => {
  const alreadyProcessed = orders.find(
    (o) => o.order_id === order.order_id
  );

  if (alreadyProcessed) {
    return {
      processed: false,
      message: "Order already processed",
    };
  }

  // Validar inventario antes de modificar datos
  for (const item of order.items) {
    const stock = inventory[item.sku];

    if (stock === undefined) {
      return {
        processed: false,
        message: `SKU ${item.sku} no existe`,
      };
    }

    if (stock < item.qty) {
      return {
        processed: false,
        message: `Stock insuficiente para ${item.sku}`,
      };
    }
  }

  // Guardar orden
  orders.push(order);

  // Descontar inventario
  for (const item of order.items) {
    inventory[item.sku] -= item.qty;
  }

  return {
    processed: true,
    message: "Order processed",
  };
};