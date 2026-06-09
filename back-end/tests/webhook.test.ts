import request from "supertest";
import app from "../src/app";

describe("Webhook de pagos", () => {
  it("debe procesar una orden válida", async () => {
    const response = await request(app)
      .post("/webhooks/pago")
      .send({
        order_id: "1001",
        status: "paid",
        amount: 1450,
        items: [
          {
            sku: "BRX-01",
            qty: 2,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      processed: true,
      message: "Order processed",
    });
  });

  it("no debe procesar una orden repetida", async () => {
    const payload = {
      order_id: "2001",
      status: "paid",
      amount: 1450,
      items: [
        {
          sku: "BRX-01",
          qty: 2,
        },
      ],
    };

    await request(app).post("/webhooks/pago").send(payload);

    const response = await request(app).post("/webhooks/pago").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      processed: false,
      message: "Order already processed",
    });
  });

  it("no debe procesar una orden si no hay stock suficiente", async () => {
    const response = await request(app)
      .post("/webhooks/pago")
      .send({
        order_id: "3001",
        status: "paid",
        amount: 1450,
        items: [
          {
            sku: "BRX-01",
            qty: 999,
          },
        ],
      });

    expect(response.status).toBe(200);

    expect(response.body.processed).toBe(false);
  });
});
