/**
 * PricingStrategy - Implementación de estrategias de precios para productos
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature PricingStrategy
 */

// Importación de la interfaz que define el contrato para todas las estrategias
import type { IPricingStrategy } from "@/core/interfaces/IPricingStrategy"

// Implementación concreta de estrategia: Precio fijo sin variaciones
export class FixedPricingStrategy implements IPricingStrategy {
  // Implementación del método requerido por la interfaz IPricingStrategy
  calculatePrice(basePrice: number, quantity: number): number {
    return basePrice * quantity
  }
}

// Implementación concreta de estrategia: Descuento por volumen
export class VolumeDiscountStrategy implements IPricingStrategy {
  private discountThreshold: number  // Estado interno de la estrategia
  private discountPercentage: number

  constructor(threshold = 10, discount = 0.1) {
    this.discountThreshold = threshold
    this.discountPercentage = discount
  }

  // Implementación que varía según el estado interno de la estrategia
  calculatePrice(basePrice: number, quantity: number): number {
    const total = basePrice * quantity
    if (quantity >= this.discountThreshold) {
      return total * (1 - this.discountPercentage)
    }
    return total
  }
}

// Implementación concreta de estrategia: Descuento promocional fijo
export class PromotionStrategy implements IPricingStrategy {
  private promotionDiscount: number

  constructor(discount = 0.15) {
    this.promotionDiscount = discount
  }

  // Implementación con comportamiento constante
  calculatePrice(basePrice: number, quantity: number): number {
    const total = basePrice * quantity
    return total * (1 - this.promotionDiscount)
  }
}

// Contexto que utiliza una estrategia y permite cambiarla dinámicamente
export class PricingContext {
  private strategy: IPricingStrategy  // Referencia a la estrategia actual

  // Inyección de dependencia: se recibe la estrategia a usar
  constructor(strategy: IPricingStrategy) {
    this.strategy = strategy
  }

  // Método para cambiar la estrategia en tiempo de ejecución
  setStrategy(strategy: IPricingStrategy): void {
    this.strategy = strategy
  }

  // Delega el cálculo a la estrategia actual (comportamiento variable)
  calculatePrice(basePrice: number, quantity: number): number {
    return this.strategy.calculatePrice(basePrice, quantity)
  }
}