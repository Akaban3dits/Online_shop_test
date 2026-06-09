import { Request, Response } from "express";
import { processOrder } from "../services/order.service";

export const paymentWebhook = (
  req: Request,
  res: Response
) => {
  const { order_id, status, amount, items } = req.body;

  if (status !== "paid") {
    return res.status(200).json({
      message: "Orden no procesada: estado no es 'paid'",
    });
  }

  const result = processOrder({
    order_id,
    status,
    amount,
    items: items ?? [],
  });

  return res.status(200).json(result);
};
