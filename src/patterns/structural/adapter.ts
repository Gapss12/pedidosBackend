/**
 * Adapter pattern implementation for external service integration
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature PaymentAdapter
 */

// External payment service interfaces (different APIs)
interface StripePayment {
  amount: number
  currency: string
  source: string
}

interface PayPalPayment {
  total: string
  currency_code: string
  payment_method: string
}

// Our internal payment interface
export interface PaymentRequest {
  amount: number
  currency: string
  paymentMethod: string
  orderId: string
}

export interface PaymentResponse {
  success: boolean
  transactionId: string
  message?: string
}

// Adapter for Stripe
export class StripeAdapter {
  constructor(private stripeService: any) {}

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const stripePayment: StripePayment = {
        amount: request.amount * 100, // Stripe uses cents
        currency: request.currency.toLowerCase(),
        source: request.paymentMethod,
      }

      const result = await this.stripeService.charges.create(stripePayment)

      return {
        success: true,
        transactionId: result.id,
        message: "Payment processed successfully",
      }
    } catch (error) {
      return {
        success: false,
        transactionId: "",
        message: "Payment failed",
      }
    }
  }
}

// Adapter for PayPal
export class PayPalAdapter {
  constructor(private paypalService: any) {}

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const paypalPayment: PayPalPayment = {
        total: request.amount.toString(),
        currency_code: request.currency.toUpperCase(),
        payment_method: request.paymentMethod,
      }

      const result = await this.paypalService.payment.create(paypalPayment)

      return {
        success: true,
        transactionId: result.id,
        message: "Payment processed successfully",
      }
    } catch (error) {
      return {
        success: false,
        transactionId: "",
        message: "Payment failed",
      }
    }
  }
}

// Payment processor that uses adapters
export class PaymentProcessor {
  private adapters: Map<string, StripeAdapter | PayPalAdapter> = new Map()

  addAdapter(provider: string, adapter: StripeAdapter | PayPalAdapter): void {
    this.adapters.set(provider, adapter)
  }

  async processPayment(provider: string, request: PaymentRequest): Promise<PaymentResponse> {
    const adapter = this.adapters.get(provider)
    if (!adapter) {
      return {
        success: false,
        transactionId: "",
        message: "Payment provider not supported",
      }
    }

    return await adapter.processPayment(request)
  }
}
