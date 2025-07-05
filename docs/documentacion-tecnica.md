# Documentación de Endpoints - API REST

## Información General

**Base URL:** `http://localhost:3000/api`
**Formato de respuesta:** JSON
**Autenticación:** No implementada (fuera del scope)

### Formato de Respuesta Estándar

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string (solo en errores)
}
```

---

## **USUARIOS** - `/api/users`

### `GET /api/users`
**Descripción:** Obtener lista de todos los usuarios
**Método:** GET
**Parámetros:** Ninguno
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@email.com",
      "type": "client",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Usuarios obtenidos correctamente"
}
```

### `GET /api/users/:id`
**Descripción:** Obtener usuario por ID
**Método:** GET
**Parámetros de ruta:** `id` (number) - ID del usuario
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "type": "client",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Usuario obtenido correctamente"
}
```
**Errores:**
- `404`: Usuario no encontrado

### `POST /api/users`
**Descripción:** Crear nuevo usuario (utiliza Factory Method)
**Método:** POST
**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "type": "client" // opcional: "client" | "admin"
}
```
**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "type": "client",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Usuario creado correctamente"
}
```
**Errores:**
- `400`: Email ya registrado
- `400`: Datos inválidos

**Patrón aplicado:** Factory Method para creación de tipos de usuario

### `PUT /api/users/:id`
**Descripción:** Actualizar usuario existente
**Método:** PUT
**Parámetros de ruta:** `id` (number) - ID del usuario
**Body:**
```json
{
  "name": "Juan Carlos Pérez", // opcional
  "email": "juancarlos@email.com", // opcional
  "type": "admin" // opcional
}
```
**Respuesta exitosa (200):** Igual que GET usuario
**Errores:**
- `404`: Usuario no encontrado
- `400`: Email ya en uso por otro usuario

### `DELETE /api/users/:id`
**Descripción:** Eliminar usuario
**Método:** DELETE
**Parámetros de ruta:** `id` (number) - ID del usuario
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario eliminado correctamente"
}
```
**Errores:**
- `404`: Usuario no encontrado

---

## **PRODUCTOS** - `/api/products`

### `GET /api/products`
**Descripción:** Obtener lista de todos los productos
**Método:** GET
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop Gaming",
      "description": "Laptop para gaming de alta gama",
      "price": 1500.00,
      "stock": 10,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Productos obtenidos correctamente"
}
```

### `GET /api/products/:id`
**Descripción:** Obtener producto por ID
**Método:** GET
**Parámetros de ruta:** `id` (number) - ID del producto
**Respuesta exitosa (200):** Objeto producto individual
**Errores:**
- `404`: Producto no encontrado

### `POST /api/products`
**Descripción:** Crear nuevo producto
**Método:** POST
**Body:**
```json
{
  "name": "Laptop Gaming",
  "description": "Laptop para gaming de alta gama", // opcional
  "price": 1500.00,
  "stock": 10
}
```
**Respuesta exitosa (201):** Objeto producto creado
**Errores:**
- `400`: Precio debe ser mayor a 0
- `400`: Stock no puede ser negativo

### `PUT /api/products/:id`
**Descripción:** Actualizar producto existente
**Método:** PUT
**Parámetros de ruta:** `id` (number) - ID del producto
**Body:** Campos opcionales del producto
**Respuesta exitosa (200):** Objeto producto actualizado
**Errores:**
- `404`: Producto no encontrado
- `400`: Validaciones de precio/stock

### `DELETE /api/products/:id`
**Descripción:** Eliminar producto
**Método:** DELETE
**Parámetros de ruta:** `id` (number) - ID del producto
**Respuesta exitosa (200):** Mensaje de confirmación
**Errores:**
- `404`: Producto no encontrado

### `POST /api/products/:id/calculate-price`
**Descripción:** Calcular precio con estrategia específica (Strategy Pattern)
**Método:** POST
**Parámetros de ruta:** `id` (number) - ID del producto
**Body:**
```json
{
  "quantity": 15,
  "strategy": "volume_discount" // "fixed" | "volume_discount" | "promotion"
}
```
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "price": 1350.00, // precio calculado con descuento
    "quantity": 15,
    "strategy": "volume_discount"
  },
  "message": "Precio calculado correctamente"
}
```
**Errores:**
- `404`: Producto no encontrado
- `400`: Cantidad inválida

**Patrón aplicado:** Strategy para diferentes algoritmos de precio

---

## **PEDIDOS** - `/api/orders`

### `GET /api/orders`
**Descripción:** Obtener lista de todos los pedidos
**Método:** GET
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "status": "confirmed",
      "total": 3000.00,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Pedidos obtenidos correctamente"
}
```

### `GET /api/orders/:id`
**Descripción:** Obtener pedido por ID
**Método:** GET
**Parámetros de ruta:** `id` (number) - ID del pedido
**Respuesta exitosa (200):** Objeto pedido individual
**Errores:**
- `404`: Pedido no encontrado

### `GET /api/orders/user/:userId`
**Descripción:** Obtener pedidos de un usuario específico
**Método:** GET
**Parámetros de ruta:** `userId` (number) - ID del usuario
**Respuesta exitosa (200):** Array de pedidos del usuario
**Errores:**
- `404`: Usuario no encontrado

### `POST /api/orders`
**Descripción:** Crear nuevo pedido (utiliza Facade Pattern)
**Método:** POST
**Body:**
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "paymentMethod": "stripe" // opcional: "stripe" | "paypal"
}
```
**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "status": "confirmed",
    "total": 3000.00,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Pedido creado correctamente"
}
```
**Errores:**
- `404`: Usuario no encontrado
- `404`: Producto no encontrado
- `400`: Stock insuficiente
- `400`: Error en procesamiento de pago

**Patrones aplicados:** 
- Facade para coordinación compleja
- Adapter para procesamiento de pagos
- Observer para notificaciones

### `PUT /api/orders/:id`
**Descripción:** Actualizar estado del pedido
**Método:** PUT
**Parámetros de ruta:** `id` (number) - ID del pedido
**Body:**
```json
{
  "status": "shipped" // "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
}
```
**Respuesta exitosa (200):** Objeto pedido actualizado
**Errores:**
- `404`: Pedido no encontrado

### `POST /api/orders/:id/cancel`
**Descripción:** Cancelar pedido (restaura stock)
**Método:** POST
**Parámetros de ruta:** `id` (number) - ID del pedido
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Pedido cancelado correctamente"
}
```
**Errores:**
- `404`: Pedido no encontrado

**Patrón aplicado:** Facade para proceso de cancelación complejo

---

##  **DETALLES DE PEDIDO** - `/api/order-details`

### `GET /api/order-details`
**Descripción:** Obtener todos los detalles de pedidos
**Método:** GET
**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "orderId": 1,
      "productId": 1,
      "quantity": 2,
      "unitPrice": 1500.00,
      "subtotal": 3000.00,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Detalles de pedidos obtenidos correctamente"
}
```

### `GET /api/order-details/:id`
**Descripción:** Obtener detalle específico por ID
**Método:** GET
**Parámetros de ruta:** `id` (number) - ID del detalle
**Respuesta exitosa (200):** Objeto detalle individual
**Errores:**
- `404`: Detalle no encontrado

### `GET /api/order-details/order/:orderId`
**Descripción:** Obtener todos los detalles de un pedido específico
**Método:** GET
**Parámetros de ruta:** `orderId` (number) - ID del pedido
**Respuesta exitosa (200):** Array de detalles del pedido
**Errores:**
- `404`: Pedido no encontrado

### `POST /api/order-details`
**Descripción:** Crear nuevo detalle de pedido (uso interno)
**Método:** POST
**Body:**
```json
{
  "orderId": 1,
  "productId": 1,
  "quantity": 2,
  "unitPrice": 1500.00,
  "subtotal": 3000.00
}
```
**Respuesta exitosa (201):** Objeto detalle creado
**Errores:**
- `400`: Cantidad debe ser mayor a 0
- `400`: Precio unitario debe ser mayor a 0
- `400`: Subtotal no coincide con cálculo

### `PUT /api/order-details/:id`
**Descripción:** Actualizar detalle de pedido
**Método:** PUT
**Parámetros de ruta:** `id` (number) - ID del detalle
**Body:** Campos opcionales del detalle
**Respuesta exitosa (200):** Objeto detalle actualizado
**Errores:**
- `404`: Detalle no encontrado
- `400`: Validaciones de cantidad/precio

### `DELETE /api/order-details/:id`
**Descripción:** Eliminar detalle de pedido
**Método:** DELETE
**Parámetros de ruta:** `id` (number) - ID del detalle
**Respuesta exitosa (200):** Mensaje de confirmación
**Errores:**
- `404`: Detalle no encontrado

---

##  **ENDPOINT DE SALUD**

### `GET /health`
**Descripción:** Verificar estado del servidor
**Método:** GET
**Respuesta exitosa (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## **CÓDIGOS DE ERROR COMUNES**

| Código | Descripción | Cuándo ocurre |
|--------|-------------|---------------|
| `200` | OK | Operación exitosa |
| `201` | Created | Recurso creado exitosamente |
| `400` | Bad Request | Datos inválidos o reglas de negocio |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error interno del servidor |

## 📊 **EJEMPLOS DE USO COMPLETO**

### Flujo Completo: Crear Usuario y Pedido

1. **Crear Usuario:**
```bash
POST /api/users
{
  "name": "María García",
  "email": "maria@email.com",
  "type": "client"
}
```

2. **Crear Productos:**
```bash
POST /api/products
{
  "name": "Smartphone",
  "price": 800.00,
  "stock": 50
}
```

3. **Calcular Precio con Descuento:**
```bash
POST /api/products/1/calculate-price
{
  "quantity": 12,
  "strategy": "volume_discount"
}
```

4. **Crear Pedido (Facade):**
```bash
POST /api/orders
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 12
    }
  ],
  "paymentMethod": "stripe"
}
```

5. **Consultar Detalles del Pedido:**
```bash
GET /api/order-details/order/1
```

## **Patrones de Diseño en Endpoints**

| Endpoint | Patrón Aplicado | Descripción |
|----------|----------------|-------------|
| `POST /api/users` | Factory Method | Creación de tipos de usuario |
| `POST /api/products/:id/calculate-price` | Strategy | Cálculo dinámico de precios |
| `POST /api/orders` | Facade + Adapter + Observer | Proceso complejo de pedido |
| `POST /api/orders/:id/cancel` | Facade | Cancelación con rollback |
