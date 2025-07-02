/**
 * Observer pattern implementation for notification system
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Observer
 * Propósito: Definir una dependencia uno-a-muchos entre objetos para que cuando
 * un objeto cambie de estado, todos sus dependientes sean notificados automáticamente
 *
 * Justificación: Cuando ocurren eventos importantes (nuevo pedido, stock bajo, etc.)
 * múltiples componentes necesitan ser notificados (email, SMS, logs, etc.)
 *
 * Implementación: Sistema de eventos para notificaciones automáticas
 */

// Interfaz para los observadores
export interface Observer {
  update(eventType: string, data: any): Promise<void>
  getName(): string
}

// Interfaz para el sujeto observable
export interface Subject {
  addObserver(observer: Observer): void
  removeObserver(observer: Observer): void
  notifyObservers(eventType: string, data: any): Promise<void>
}

// Sujeto concreto - Gestor de eventos
export class EventManager implements Subject {
  private observers: Observer[] = []

  addObserver(observer: Observer): void {
    this.observers.push(observer)
    console.log(`👁️ Observer: ${observer.getName()} agregado al sistema`)
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
      console.log(`👁️ Observer: ${observer.getName()} removido del sistema`)
    }
  }

  async notifyObservers(eventType: string, data: any): Promise<void> {
    console.log(`📢 EventManager: Notificando evento '${eventType}' a ${this.observers.length} observadores`)

    // Notificar a todos los observadores de forma asíncrona
    const notifications = this.observers.map((observer) =>
      observer
        .update(eventType, data)
        .catch((error) => console.error(`Error en observer ${observer.getName()}:`, error)),
    )

    await Promise.all(notifications)
    console.log(`✅ EventManager: Notificación completada para evento '${eventType}'`)
  }

  getObserverCount(): number {
    return this.observers.length
  }
}

// Observer concreto 1 - Notificaciones por email
export class EmailNotificationObserver implements Observer {
  getName(): string {
    return "EmailNotificationObserver"
  }

  async update(eventType: string, data: any): Promise<void> {
    console.log(`📧 EmailObserver: Procesando evento '${eventType}'`)

    switch (eventType) {
      case "order_created":
        await this.sendOrderConfirmationEmail(data)
        break
      case "order_shipped":
        await this.sendShippingNotificationEmail(data)
        break
      case "low_stock":
        await this.sendLowStockAlertEmail(data)
        break
      default:
        console.log(`📧 EmailObserver: Evento '${eventType}' no manejado`)
    }
  }

  private async sendOrderConfirmationEmail(data: any): Promise<void> {
    console.log(`📧 Enviando email de confirmación de pedido a usuario ${data.userId}`)
    console.log(`   Pedido: ${data.orderId}, Total: $${data.total}`)
    // Aquí iría la lógica real de envío de email
  }

  private async sendShippingNotificationEmail(data: any): Promise<void> {
    console.log(`📧 Enviando email de envío a usuario ${data.userId}`)
    console.log(`   Pedido: ${data.orderId}, Tracking: ${data.trackingNumber}`)
  }

  private async sendLowStockAlertEmail(data: any): Promise<void> {
    console.log(`📧 Enviando alerta de stock bajo para producto ${data.productId}`)
    console.log(`   Stock actual: ${data.currentStock}, Mínimo: ${data.minimumStock}`)
  }
}

// Observer concreto 2 - Notificaciones SMS
export class SMSNotificationObserver implements Observer {
  getName(): string {
    return "SMSNotificationObserver"
  }

  async update(eventType: string, data: any): Promise<void> {
    console.log(`📱 SMSObserver: Procesando evento '${eventType}'`)

    switch (eventType) {
      case "order_created":
        await this.sendOrderConfirmationSMS(data)
        break
      case "order_shipped":
        await this.sendShippingNotificationSMS(data)
        break
      default:
        console.log(`📱 SMSObserver: Evento '${eventType}' no requiere SMS`)
    }
  }

  private async sendOrderConfirmationSMS(data: any): Promise<void> {
    console.log(`📱 Enviando SMS de confirmación a usuario ${data.userId}`)
    console.log(`   Mensaje: "Su pedido ${data.orderId} ha sido confirmado"`)
  }

  private async sendShippingNotificationSMS(data: any): Promise<void> {
    console.log(`📱 Enviando SMS de envío a usuario ${data.userId}`)
    console.log(`   Mensaje: "Su pedido ${data.orderId} ha sido enviado"`)
  }
}

// Observer concreto 3 - Logging del sistema
export class SystemLogObserver implements Observer {
  getName(): string {
    return "SystemLogObserver"
  }

  async update(eventType: string, data: any): Promise<void> {
    const timestamp = new Date().toISOString()
    console.log(`📝 SystemLog: [${timestamp}] Evento '${eventType}' registrado`)
    console.log(`📝 SystemLog: Datos:`, JSON.stringify(data, null, 2))

    // Aquí se guardaría en base de datos, archivo de log, etc.
  }
}

// Observer concreto 4 - Métricas y analytics
export class AnalyticsObserver implements Observer {
  getName(): string {
    return "AnalyticsObserver"
  }

  async update(eventType: string, data: any): Promise<void> {
    console.log(`📊 Analytics: Registrando métrica para evento '${eventType}'`)

    switch (eventType) {
      case "order_created":
        await this.trackOrderMetrics(data)
        break
      case "user_registered":
        await this.trackUserRegistration(data)
        break
      default:
        console.log(`📊 Analytics: Evento '${eventType}' no requiere métricas especiales`)
    }
  }

  private async trackOrderMetrics(data: any): Promise<void> {
    console.log(`📊 Registrando métricas de pedido:`)
    console.log(`   - Valor del pedido: $${data.total}`)
    console.log(`   - Número de items: ${data.itemCount}`)
    console.log(`   - Usuario: ${data.userId}`)
  }

  private async trackUserRegistration(data: any): Promise<void> {
    console.log(`📊 Registrando nuevo usuario: ${data.userId}`)
  }
}

// Clase que utiliza el patrón Observer
export class OrderEventPublisher {
  private eventManager: EventManager

  constructor() {
    this.eventManager = new EventManager()
    this.setupObservers()
  }

  private setupObservers(): void {
    // Registrar todos los observadores
    this.eventManager.addObserver(new EmailNotificationObserver())
    this.eventManager.addObserver(new SMSNotificationObserver())
    this.eventManager.addObserver(new SystemLogObserver())
    this.eventManager.addObserver(new AnalyticsObserver())

    console.log(`🎯 OrderEventPublisher: Sistema de observadores configurado`)
  }

  async publishOrderCreated(orderId: string, userId: string, total: number, itemCount: number): Promise<void> {
    await this.eventManager.notifyObservers("order_created", {
      orderId,
      userId,
      total,
      itemCount,
      timestamp: new Date(),
    })
  }

  async publishOrderShipped(orderId: string, userId: string, trackingNumber: string): Promise<void> {
    await this.eventManager.notifyObservers("order_shipped", {
      orderId,
      userId,
      trackingNumber,
      timestamp: new Date(),
    })
  }

  async publishLowStock(productId: string, currentStock: number, minimumStock: number): Promise<void> {
    await this.eventManager.notifyObservers("low_stock", {
      productId,
      currentStock,
      minimumStock,
      timestamp: new Date(),
    })
  }

  async publishUserRegistered(userId: string, email: string): Promise<void> {
    await this.eventManager.notifyObservers("user_registered", {
      userId,
      email,
      timestamp: new Date(),
    })
  }

  getEventManager(): EventManager {
    return this.eventManager
  }
}
