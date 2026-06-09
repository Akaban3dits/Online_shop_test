import { body } from "express-validator";

export const webhookValidator = [
  body("order_id")
    .notEmpty()
    .withMessage("Debe proporcionar el ID de la orden"),

  body("status")
    .notEmpty()
    .withMessage("Debe proporcionar el estado de la orden"),

  body("amount")
    .notEmpty()
    .withMessage("Debe proporcionar el monto de la orden")
    .isNumeric()
    .withMessage("El monto debe ser un valor numérico"),
];