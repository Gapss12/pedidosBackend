/**
 * Strategy pattern implementation for different validation and payment strategies
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Strategy
 */

// Validation strategies
export interface ValidationStrategy {
  validate(data: any): { isValid: boolean; errors: string[] }
}

export class EmailValidationStrategy implements ValidationStrategy {
  validate(email: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      errors.push("Email is required")
    } else if (!emailRegex.test(email)) {
      errors.push("Invalid email format")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

export class PasswordValidationStrategy implements ValidationStrategy {
  validate(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!password) {
      errors.push("Password is required")
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long")
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("Password must contain at least one uppercase letter")
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one number")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}

// Payment strategies
export interface PaymentStrategy {
  processPayment(amount: number, details: any): Promise<{ success: boolean; transactionId?: string; error?: string }>
}

export class CreditCardPaymentStrategy implements PaymentStrategy {
  async processPayment(
    amount: number,
    details: any,
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // Credit card payment logic
    console.log(`Processing credit card payment of $${amount}`)

    // Simulate payment processing
    if (details.cardNumber && details.expiryDate && details.cvv) {
      return {
        success: true,
        transactionId: `cc_${Date.now()}`,
      }
    }

    return {
      success: false,
      error: "Invalid credit card details",
    }
  }
}

export class PayPalPaymentStrategy implements PaymentStrategy {
  async processPayment(
    amount: number,
    details: any,
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // PayPal payment logic
    console.log(`Processing PayPal payment of $${amount}`)

    if (details.paypalEmail) {
      return {
        success: true,
        transactionId: `pp_${Date.now()}`,
      }
    }

    return {
      success: false,
      error: "Invalid PayPal details",
    }
  }
}

export class BankTransferPaymentStrategy implements PaymentStrategy {
  async processPayment(
    amount: number,
    details: any,
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // Bank transfer payment logic
    console.log(`Processing bank transfer payment of $${amount}`)

    if (details.accountNumber && details.routingNumber) {
      return {
        success: true,
        transactionId: `bt_${Date.now()}`,
      }
    }

    return {
      success: false,
      error: "Invalid bank transfer details",
    }
  }
}

// Context classes that use strategies
export class ValidationContext {
  private strategy: ValidationStrategy

  constructor(strategy: ValidationStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: ValidationStrategy): void {
    this.strategy = strategy
  }

  validate(data: any): { isValid: boolean; errors: string[] } {
    return this.strategy.validate(data)
  }
}

export class PaymentContext {
  private strategy: PaymentStrategy

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy
  }

  async processPayment(
    amount: number,
    details: any,
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    return await this.strategy.processPayment(amount, details)
  }
}
