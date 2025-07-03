export interface IPaymentGateway {
  processPayment(amount: number, cardToken: string): Promise<boolean>
}
