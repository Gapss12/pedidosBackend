/**
 * Order Detail Data Transfer Object
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature OrderDetailDto
 */
export interface CreateOrderDetailDto {
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface UpdateOrderDetailDto {
  quantity?: number
  unitPrice?: number
  subtotal?: number
}
