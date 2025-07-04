export interface CreateOrderDetailDto {
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface UpdateOrderDetailDto {
  quantity?: number
  unitPrice?: number
  subtotal?: number
}
