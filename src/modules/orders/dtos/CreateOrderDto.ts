export interface CreateOrderDto {
  userId: number
  items: OrderItemDto[]
  paymentMethod?: "stripe" | "paypal"
}

export interface OrderItemDto {
  productId: number
  quantity: number
}

export interface UpdateOrderDto {
  status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
}
