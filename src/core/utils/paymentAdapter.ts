/**
 * Adaptadores para integrar diferentes pasarelas de pago
 * @author Gabriel Guzman
 * @date 2025-07-07
 * @signature PaymentAdapter
 */

// PATRÓN ADAPTER - Integración con diferentes pasarelas de pago
import type { IPaymentGateway } from "@/core/interfaces/IPaymentGateway"

// Simulación de pasarelas externas
class StripeGateway {
  async charge(amount: number, token: string): Promise<{ success: boolean }> {
    // Simulación de llamada a Stripe
    console.log(`Procesando pago con Stripe: $${amount}`)
    return { success: Math.random() > 0.1 } 
  }
}

class PayPalGateway {
  async processTransaction(value: number, cardInfo: string): Promise<boolean> {
    // Simulación de llamada a PayPal
    console.log(`Procesando pago con PayPal: $${value}`)
    return Math.random() > 0.1 
  }
}

// Adaptadores que implementan la interfaz común
export class StripeAdapter implements IPaymentGateway {
  private gateway = new StripeGateway()

  async processPayment(amount: number, cardToken: string): Promise<boolean> {
    const result = await this.gateway.charge(amount, cardToken)
    return result.success
  }
}

export class PayPalAdapter implements IPaymentGateway {
  private gateway = new PayPalGateway()

  async processPayment(amount: number, cardToken: string): Promise<boolean> {
    return await this.gateway.processTransaction(amount, cardToken)
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
