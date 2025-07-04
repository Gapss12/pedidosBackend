/**
 * OrderRepository - Repositorio para manejar operaciones de pedidos
 * @author Gabriel Guzman
 * @date 2025-07-04\
 * @signature OrderRepository
 */
import { OrderModel } from "@/core/models/index"
import type { IRepository } from "../../../core/interfaces/IRepository"
import { Order } from "../../../core/entities/Order"

export class OrderRepository implements IRepository<Order> {
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["user"],
    })
    return orders.map(
      (order) => new Order(order.id, order.userId, order.status, order.total, order.createdAt, order.updatedAt),
    )
  }

  async findById(id: number): Promise<Order | null> {
    const order = await OrderModel.findByPk(id, {
      include: ["user"],
    })
    if (!order) return null

    return new Order(order.id, order.userId, order.status, order.total, order.createdAt, order.updatedAt)
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      where: { userId },
      include: ["user"],
    })
    return orders.map(
      (order) => new Order(order.id, order.userId, order.status, order.total, order.createdAt, order.updatedAt),
    )
  }

  async create(data: Partial<Order>): Promise<Order> {
    const order = await OrderModel.create(data as any)
    return new Order(order.id, order.userId, order.status, order.total, order.createdAt, order.updatedAt)
  }

  async update(id: number, data: Partial<Order>): Promise<Order | null> {
    const [affectedRows] = await OrderModel.update(data as any, { where: { id } })
    if (affectedRows === 0) return null

    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await OrderModel.destroy({ where: { id } })
    return affectedRows > 0
  }
}
