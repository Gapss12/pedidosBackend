export interface IPricingStrategy {
  calculatePrice(basePrice: number, quantity: number): number
}
