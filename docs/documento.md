# documento

# Patrones de Diseño Utilizados

## Resumen Ejecutivo

Este documento describe los 6 patrones de diseño implementados en el sistema de gestión integral de pedidos, distribuidos en 2 creacionales, 2 estructurales y 2 de comportamiento, aplicados en contextos reales y funcionales del sistema.

## PATRONES CREACIONALES

### 1. Factory Method

**Ubicación:** `src/modules/users/factories/UserFactory.ts`

**Propósito:** Crear diferentes tipos de usuario (cliente y administrador) sin especificar la clase exacta del objeto que se creará.

**Justificación:**

- Permite extensibilidad para nuevos tipos de usuario sin modificar código existente
- Encapsula la lógica de creación específica para cada tipo
- Facilita el mantenimiento y testing al centralizar la creación

**Implementación:**

```tsx
// Clase abstracta que define el contrato
export abstract class UserFactory implements IUserFactory {
  abstract createUser(name: string, email: string): User
}

// Factory concreto para clientes
export class ClientUserFactory extends UserFactory {
  createUser(name: string, email: string): User {
    return new User(0, name, email, UserType.CLIENT)
  }
}

// Factory concreto para administradores
export class AdminUserFactory extends UserFactory {
  createUser(name: string, email: string): User {
    return new User(0, name, email, UserType.ADMIN)
  }
}

// Provider que selecciona el factory apropiado
export class UserFactoryProvider {
  static getFactory(type: UserType): UserFactory {
    switch (type) {
      case UserType.CLIENT:
        return new ClientUserFactory()
      case UserType.ADMIN:
        return new AdminUserFactory()
      default:
        throw new Error(`Tipo de usuario no soportado: ${type}`)
    }
  }
}
```

**Uso en el sistema:**

```tsx
// En UserService.createUser()
const userType = userData.type === "admin" ? UserType.ADMIN : UserType.CLIENT
const factory = UserFactoryProvider.getFactory(userType)
const userEntity = factory.createUser(userData.name, userData.email)

```

---

### 2. Builder

**Ubicación:** `src/core/application/ReportBuilder.ts`

**Propósito:** Construir objetos complejos (reportes de ventas) paso a paso, permitiendo diferentes representaciones del mismo proceso de construcción.

**Justificación:**

- Los reportes tienen múltiples campos opcionales y configuraciones
- Permite crear reportes con diferentes niveles de detalle
- Facilita la lectura y mantenimiento del código de construcción
- Evita constructores con muchos parámetros

**Implementación:**

```tsx
export interface SalesReport {
  title: string
  dateRange: { from: Date; to: Date }
  totalSales: number
  orderCount: number
  topProducts: Array<{ name: string; quantity: number }>
  filters: string[]
}

export class ReportBuilder {
  private report: Partial<SalesReport> = {}

  setTitle(title: string): ReportBuilder {
    this.report.title = title
    return this // Fluent interface
  }

  setDateRange(from: Date, to: Date): ReportBuilder {
    this.report.dateRange = { from, to }
    return this
  }

  addFilter(filter: string): ReportBuilder {
    if (!this.report.filters) {
      this.report.filters = []
    }
    this.report.filters.push(filter)
    return this
  }

  build(): SalesReport {
    // Validación de campos requeridos
    if (!this.report.title || !this.report.dateRange) {
      throw new Error("Título y rango de fechas son requeridos")
    }

    return {
      title: this.report.title,
      dateRange: this.report.dateRange,
      totalSales: this.report.totalSales || 0,
      orderCount: this.report.orderCount || 0,
      topProducts: this.report.topProducts || [],
      filters: this.report.filters || [],
    }
  }
}

```

**Uso en el sistema:**

```tsx
const report = new ReportBuilder()
  .setTitle("Reporte Mensual")
  .setDateRange(new Date('2024-01-01'), new Date('2024-01-31'))
  .setTotalSales(15000)
  .addFilter("productos > $100")
  .build()

```

---

## PATRONES ESTRUCTURALES

### 3. Adapter

**Ubicación:** `src/utils/paymentAdapter.ts`

**Propósito:** Permitir que interfaces incompatibles de diferentes pasarelas de pago trabajen juntas a través de una interfaz común.

**Justificación:**

- Cada pasarela de pago (Stripe, PayPal) tiene su propia API
- Necesitamos una interfaz uniforme para el procesamiento de pagos
- Facilita el cambio entre proveedores sin afectar el código cliente
- Permite agregar nuevas pasarelas fácilmente

**Implementación:**

```tsx
// Interfaz común para todas las pasarelas
export interface IPaymentGateway {
  processPayment(amount: number, cardToken: string): Promise<boolean>
}

// Servicio externo de Stripe (simulado)
class StripeGateway {
  async charge(amount: number, token: string): Promise<{ success: boolean }> {
    console.log(`Procesando pago con Stripe: $${amount}`)
    return { success: Math.random() > 0.1 }
  }
}

// Adapter que adapta Stripe a nuestra interfaz
export class StripeAdapter implements IPaymentGateway {
  private gateway = new StripeGateway()

  async processPayment(amount: number, cardToken: string): Promise<boolean> {
    const result = await this.gateway.charge(amount, cardToken)
    return result.success // Adaptamos la respuesta
  }
}

// Factory para crear adaptadores
export class PaymentAdapterFactory {
  static createAdapter(type: "stripe" | "paypal"): IPaymentGateway {
    switch (type) {
      case "stripe":
        return new StripeAdapter()
      case "paypal":
        return new PayPalAdapter()
      default:
        throw new Error(`Tipo de pasarela no soportado: ${type}`)
    }
  }
}

```

**Uso en el sistema:**

```tsx
// En OrderProcessFacade
const paymentAdapter = PaymentAdapterFactory.createAdapter(orderData.paymentMethod)
const paymentSuccess = await paymentAdapter.processPayment(totalAmount, "dummy-token")

```

---

### 4. Facade

**Ubicación:** `src/modules/orders/services/OrderProcessFacade.ts`

**Propósito:** Proporcionar una interfaz simplificada para el complejo proceso de creación de pedidos que involucra múltiples subsistemas.

**Justificación:**

- El proceso de pedido involucra validación de usuario, productos, stock, pagos y notificaciones
- Simplifica la interacción del cliente con múltiples servicios
- Centraliza la lógica de negocio compleja
- Facilita el mantenimiento y testing

**Implementación:**

```tsx
export class OrderProcessFacade {
  private orderService: OrderService
  private orderDetailService: OrderDetailService
  private productService: ProductService
  private userService: UserService
  private notificationManager: NotificationManager

  constructor() {
    // Inicialización de todos los servicios necesarios
    this.orderService = new OrderService()
    this.orderDetailService = new OrderDetailService()
    this.productService = new ProductService()
    this.userService = new UserService()
    this.notificationManager = NotificationManager.getInstance()
  }

  async processOrder(orderData: CreateOrderDto): Promise<Order> {
    try {
      // 1. Validar usuario
      const user = await this.userService.getUserById(orderData.userId)

      // 2. Validar productos y stock
      let totalAmount = 0
      for (const item of orderData.items) {
        const product = await this.productService.getProductById(item.productId)
        const hasStock = await this.productService.checkStock(item.productId, item.quantity)

        if (!hasStock) {
          throw new AppError(`Stock insuficiente para: ${product.name}`, 400)
        }
        totalAmount += product.price * item.quantity
      }

      // 3. Procesar pago
      if (orderData.paymentMethod) {
        const paymentAdapter = PaymentAdapterFactory.createAdapter(orderData.paymentMethod)
        const paymentSuccess = await paymentAdapter.processPayment(totalAmount, "dummy-token")

        if (!paymentSuccess) {
          throw new AppError("Error en el procesamiento del pago", 400)
        }
      }

      // 4. Crear pedido
      const order = await this.orderService.createOrder({
        userId: orderData.userId,
        status: "confirmed",
        total: totalAmount,
      })

      // 5. Crear detalles y reducir stock
      for (const item of orderData.items) {
        const product = await this.productService.getProductById(item.productId)

        await this.orderDetailService.createOrderDetail({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
          subtotal: product.price * item.quantity,
        })

        await this.productService.reduceStock(item.productId, item.quantity)
      }

      // 6. Notificar
      this.notificationManager.notify("order_created", {
        orderId: order.id,
        userEmail: user.email,
        total: totalAmount,
      })

      return order
    } catch (error) {
      console.error("Error en procesamiento de pedido:", error)
      throw error
    }
  }
}
```

**Uso en el sistema:**

```tsx
// En OrderController
const order = await this.orderProcessFacade.processOrder(orderData)
```

---

## PATRONES DE COMPORTAMIENTO

### 5. Observer

**Ubicación:** `src/modules/users/services/NotificationManager.ts`

**Propósito:** Definir una dependencia uno-a-muchos entre objetos, de modo que cuando un objeto cambie de estado, todos sus dependientes sean notificados automáticamente.

**Justificación:**

- Necesitamos notificar múltiples sistemas cuando ocurren eventos (email, SMS, logs)
- Permite agregar nuevos tipos de notificación sin modificar código existente
- Desacopla el emisor de eventos de los receptores
- Facilita el testing y mantenimiento

**Implementación:**

```tsx
// Interfaces del patrón
export interface IObserver {
  update(event: string, data: any): void
}

export interface ISubject {
  subscribe(observer: IObserver): void
  unsubscribe(observer: IObserver): void
  notify(event: string, data: any): void
}

// Implementación del Subject (Singleton)
export class NotificationManager implements ISubject {
  private static instance: NotificationManager
  private observers: IObserver[] = []

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  subscribe(observer: IObserver): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notify(event: string, data: any): void {
    console.log(`Notificando evento: ${event}`)
    this.observers.forEach((observer) => observer.update(event, data))
  }
}

// Observadores concretos
export class EmailNotificationObserver implements IObserver {
  update(event: string, data: any): void {
    switch (event) {
      case "user_created":
        console.log(`Enviando email de bienvenida a: ${data.email}`)
        break
      case "order_created":
        console.log(`Enviando confirmación de pedido a: ${data.userEmail}`)
        break
    }
  }
}

```

**Uso en el sistema:**

```tsx
// En UserService
this.notificationManager.notify("user_created", createdUser)

// Para suscribir observadores
const emailObserver = new EmailNotificationObserver()
notificationManager.subscribe(emailObserver)

```

---

### 6. Strategy

**Ubicación:** `src/modules/products/services/PricingStrategy.ts`

**Propósito:** Definir una familia de algoritmos de cálculo de precios, encapsular cada uno y hacerlos intercambiables en tiempo de ejecución.

**Justificación:**

- Diferentes estrategias de precio según el contexto (descuentos por volumen, promociones)
- Permite cambiar algoritmos de precio dinámicamente
- Facilita agregar nuevas estrategias sin modificar código existente
- Cumple con el principio Abierto/Cerrado

**Implementación:**

```tsx
// Interfaz de la estrategia
export interface IPricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number
}

// Estrategias concretas
export class FixedPricingStrategy implements IPricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity
  }
}

export class VolumeDiscountStrategy implements IPricingStrategy {
  private discountThreshold: number
  private discountPercentage: number

  constructor(threshold = 10, discount = 0.1) {
    this.discountThreshold = threshold
    this.discountPercentage = discount
  }

  calculatePrice(basePrice: number, quantity: number): number {
    const total = basePrice * quantity
    if (quantity >= this.discountThreshold) {
      return total * (1 - this.discountPercentage) // 10% descuento
    }
    return total
  }
}

export class PromotionStrategy implements IPricingStrategy {
  private promotionDiscount: number

  constructor(discount = 0.15) {
    this.promotionDiscount = discount
  }

  calculatePrice(basePrice: number, quantity: number): number {
    const total = basePrice * quantity
    return total * (1 - this.promotionDiscount) // 15% descuento
  }
}

// Contexto que utiliza las estrategias
export class PricingContext {
  private strategy: IPricingStrategy

  constructor(strategy: IPricingStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: IPricingStrategy): void {
    this.strategy = strategy
  }

  calculatePrice(basePrice: number, quantity: number): number {
    return this.strategy.calculatePrice(basePrice, quantity)
  }
}

```

**Uso en el sistema:**

```tsx
// En ProductService
async calculatePrice(productId: number, quantity: number, strategyType: PricingStrategyType): Promise<number> {
  const product = await this.getProductById(productId)

  let strategy
  switch (strategyType) {
    case PricingStrategyType.VOLUME_DISCOUNT:
      strategy = new VolumeDiscountStrategy()
      break
    case PricingStrategyType.PROMOTION:
      strategy = new PromotionStrategy()
      break
    default:
      strategy = new FixedPricingStrategy()
  }

  const pricingContext = new PricingContext(strategy)
  return pricingContext.calculatePrice(product.price, quantity)
}

```

---

## Resumen de Implementación

| Patrón | Tipo | Módulo | Propósito Principal |
| --- | --- | --- | --- |
| Factory Method | Creacional | Users | Creación de tipos de usuario |
| Builder | Creacional | Core/Application | Construcción de reportes |
| Adapter | Estructural | Utils | Integración de pasarelas de pago |
| Facade | Estructural | Orders | Simplificación de proceso de pedidos |
| Observer | Comportamiento | Users | Sistema de notificaciones |
| Strategy | Comportamiento | Products | Cálculo dinámico de precios |

## Beneficios Obtenidos

- **Extensibilidad:** Fácil agregar nuevos tipos sin modificar código existente
- **Mantenibilidad:** Código organizado y responsabilidades bien definidas
- **Testabilidad:** Componentes desacoplados facilitan las pruebas unitarias
- **Reutilización:** Patrones permiten reutilizar lógica en diferentes contextos
- **Flexibilidad:** Cambio de comportam