/**
 * CreateOrderDto - Data Transfer Object for creating a new order
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature CreateOrderDto
 */
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
