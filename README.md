# Online Shop Test

Prueba técnica desarrollada con:

- Backend: Node.js + Express + TypeScript
- Frontend: Next.js + TypeScript + Tailwind CSS
- Testing: Jest + Supertest

---

## Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd online_shop_test
```

---

## Backend

### Entrar a la carpeta

```bash
cd back-end
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

El servidor quedará disponible en:

```txt
http://localhost:3000
```

### Ejecutar pruebas

```bash
npm test
```

---

## Frontend

Abrir una nueva terminal.

### Entrar a la carpeta

```bash
cd front-end
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en:

```txt
http://localhost:3001
```

> El puerto puede variar si otro proceso está utilizando el puerto por defecto.

---

## Endpoint principal

### Procesar pago

```http
POST /webhooks/pago
```

Ejemplo:

```json
{
  "order_id": "1023",
  "status": "paid",
  "amount": 1450,
  "items": [
    {
      "sku": "BRX-01",
      "qty": 2
    }
  ]
}
```

---

## Consulta de órdenes

```http
GET /orders
```

Retorna la lista de órdenes procesadas.

---

## Pruebas implementadas

Se agregaron pruebas automatizadas para:

- Procesamiento correcto de una orden válida.
- Prevención de procesamiento duplicado para el mismo `order_id`.

---

## Enfoque de la solución

- Se implementó un webhook para recibir notificaciones de pago.
- Las órdenes se almacenan en memoria para simplificar la solución.
- Se utilizó `express-validator` para validar la información recibida.
- Se implementó lógica de idempotencia para evitar procesar dos veces la misma orden.
- Se descuenta inventario únicamente cuando una orden es procesada correctamente.
- Se desarrolló una interfaz sencilla en Next.js para visualizar las órdenes recibidas.

---

## Uso de IA

La IA fue utilizada como apoyo para:

- Resolver dudas puntuales de configuración.
- Generar ideas para la estructura inicial del proyecto.
- Revisar posibles mejoras y validaciones.

La implementación, adaptación de la lógica de negocio, pruebas y estructura final fueron ajustadas y verificadas manualmente.