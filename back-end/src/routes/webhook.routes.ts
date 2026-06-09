import { Router } from "express";
import { paymentWebhook } from "../controllers/webhook.controller";
import { orders } from "../data/orders";
import { webhookValidator } from "../validator/webhook.validator";
import { validationResultMiddleware } from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/webhooks/pago",
  webhookValidator,
  validationResultMiddleware,
  paymentWebhook
);
router.get("/orders", (_, res) => {
  res.status(200).json(orders);
});

export default router;