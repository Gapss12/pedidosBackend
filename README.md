

# 🧠 Sistema de Gestión de Pedidos – Backend

Este es un backend desarrollado en **Node.js + TypeScript** utilizando **Sequelize** como ORM y **PostgreSQL** como base de datos. El sistema permite la gestión integral de pedidos en una tienda en línea, incluyendo:

- Registro de usuarios y productos
- Creación y procesamiento de pedidos
- Detalle de productos comprados
- Reportes de ventas
- Envío de notificaciones

> ⚙️ Este proyecto implementa 6 patrones de diseño: Factory Method, Builder, Adapter, Facade, Observer y Strategy, integrados funcionalmente en la lógica del sistema.

---

## 📁 Estructura del Proyecto

```
src/
├── config/ # Configuración general
├── core/ # Entidades, interfaces, middlewares
├── models/ # Modelos Sequelize
├── modules/ # Módulos funcionales (users, products, orders)
├── utils/ # Helpers y adapters
├── types/ # Tipos globales
├── app.ts # App Express
└── server.ts # Punto de entrada
```
## 🚀 Tecnologías y herramientas

| Herramienta    | Uso                        |
|----------------|----------------------------|
| Node.js        | Entorno de ejecución       |
| TypeScript     | Tipado estático            |
| Express        | Framework web              |
| Sequelize      | ORM para PostgreSQL        |
| PostgreSQL     | Base de datos relacional   |
| Mermaid.js     | Diagramas UML              |
| Postman        | Pruebas de la API (externo)|

---

##  Patrones de Diseño Aplicados

| Tipo            | Patrón       | Ubicación principal                            |
|-----------------|--------------|------------------------------------------------|
| Creacional      | Factory      | `modules/users/factories/UserFactory.ts`       |
| Creacional      | Builder      | `core/application/ReportBuilder.ts`            |
| Estructural     | Adapter      | `utils/paymentAdapter.ts`                      |
| Estructural     | Facade       | `modules/orders/services/OrderProcessFacade.ts`|
| Comportamiento  | Observer     | `modules/users/services/NotificationManager.ts`|
| Comportamiento  | Strategy     | `modules/products/services/PricingStrategy.ts` |

---

##  Principios de diseño utilizados

- **SOLID** – Arquitectura limpia, desacoplada y extensible
- **KISS** – Código claro, directo y mantenible
- **DRY** – Reutilización de lógica común
- **YAGNI** – Se desarrolla solo lo necesario para cumplir la consigna

---

## Módulos disponibles

- `/users`: Registro y gestión de usuarios (Factory + Observer)
- `/products`: Gestión de productos y precios (Strategy)
- `/orders`: Creación y procesamiento de pedidos (Facade)
- `/orderDetails`: Detalle de productos por pedido

---

## 🧪 Scripts útiles

```bash
# Instalar dependencias
npm install

# Iniciar el servidor en desarrollo
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar servidor desde código compilado
npm start
```