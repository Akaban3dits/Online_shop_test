# Online Shop Test

Prueba técnica desarrollada con:

* Backend: Node.js + Express + TypeScript
* Frontend: Next.js + TypeScript + Tailwind CSS
* Testing: Jest + Supertest

## Instalación y ejecución

Abrir Visual Studio Code, crear una carpeta para el proyecto y ejecutar:

```bash
git clone https://github.com/Akaban3dits/Online_shop_test.git
cd Online_shop_test
```

### Backend

```bash
cd back-end
npm install
npm run dev 
npm test
```

### Frontend

Abrir una nueva terminal:

```bash
cd front-end
npm install
npm run dev
```


## ¿Qué te ayudó la IA?

Resolvio principalmente el tema de diseño en next.js y algunos errores de compatibilidad -Claude
Base para correr el servidor - Chatgpt
Mockup- v0.app

## ¿Qué resolví yo?

Generacion y estructura de los endpoints con base al uso de express validator y también de interfaces para crear los servicios

## ¿Qué me costo?
Unicamente el error de compatibilidad en el jest

## Prueba del webhook con Postman

Una vez levantado el backend:

```bash
cd back-end
npm install
npm run dev
```

Realizar una petición POST a:

```http
http://localhost:3000/webhooks/pago
```

Headers:

```http
Content-Type: application/json
```

Body (raw JSON):

```json
{
  "order_id": "1029",
  "status": "paid",
  "amount": 1450,
  "items": [
    {
      "sku": "BRX-01",
      "qty": 10
    }
  ]
}
```


