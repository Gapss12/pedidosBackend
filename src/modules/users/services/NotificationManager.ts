// PATRÓN OBSERVER - Sistema de notificaciones
import type { IObserver, ISubject } from "@/core/interfaces/IObserver"

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
    console.log(`📧 Notificando evento: ${event}`)
    this.observers.forEach((observer) => observer.update(event, data))
  }
}

// Observadores concretos
export class EmailNotificationObserver implements IObserver {
  update(event: string, data: any): void {
    switch (event) {
      case "user_created":
        console.log(`📧 Enviando email de bienvenida a: ${data.email}`)
        break
      case "order_created":
        console.log(`📧 Enviando confirmación de pedido a: ${data.userEmail}`)
        break
      default:
        console.log(`📧 Evento no manejado: ${event}`)
    }
  }
}

export class SMSNotificationObserver implements IObserver {
  update(event: string, data: any): void {
    switch (event) {
      case "order_shipped":
        console.log(`📱 Enviando SMS de envío para pedido: ${data.orderId}`)
        break
      default:
        console.log(`📱 Evento SMS no manejado: ${event}`)
    }
  }
}
