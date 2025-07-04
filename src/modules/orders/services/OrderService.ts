import { OrderRepository } from "../repositories/OrderRepository"
import type { UpdateOrderDto } from "../dtos/CreateOrderDto"
import type { Order } from "../../../core/entities/Order"
import { AppError } from "../../../core/middlewares/errorHandler"

interface CreateOrderData {
  userId: number
  status: string
  total: number
}

export class OrderService {
  private orderRepository: OrderRepository

  constructor() {
    this.orderRepository = new OrderRepository()
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll()
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id)
    if (!order) {
      throw new AppError("Pedido no encontrado", 404)
    }
    return order
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId)
  }

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    if (orderData.total <= 0) {
      throw new AppError("El total del pedido debe ser mayor a 0", 400)
    }

    return await this.orderRepository.create(orderData)
  }

  async updateOrder(id: number, orderData: UpdateOrderDto): Promise<Order> {
    await this.getOrderById(id) // Verificar que existe

    const updatedOrder = await this.orderRepository.update(id, orderData)
    if (!updatedOrder) {
      throw new AppError("Error al actualizar pedido", 500)
    }

    return updatedOrder
  }

  async deleteOrder(id: number): Promise<void> {
    await this.getOrderById(id) 
    const deleted = await this.orderRepository.delete(id)

    if (!deleted) {
      throw new AppError("Error al eliminar pedido", 500)
    }
  }
}
