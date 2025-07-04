import { OrderDetailModel } from "@/core/models/index"
import type { IRepository } from "@/core/interfaces/IRepository"
import { OrderDetail } from "@/core/entities/OrderDetail"

export class OrderDetailRepository implements IRepository<OrderDetail> {
  async findAll(): Promise<OrderDetail[]> {
    const orderDetails = await OrderDetailModel.findAll({
      include: ["order", "product"],
    })
    return orderDetails.map(
      (detail) =>
        new OrderDetail(
          detail.id,
          detail.orderId,
          detail.productId,
          detail.quantity,
          detail.unitPrice,
          detail.subtotal,
          detail.createdAt,
          detail.updatedAt,
        ),
    )
  }

  async findById(id: number): Promise<OrderDetail | null> {
    const detail = await OrderDetailModel.findByPk(id, {
      include: ["order", "product"],
    })
    if (!detail) return null

    return new OrderDetail(
      detail.id,
      detail.orderId,
      detail.productId,
      detail.quantity,
      detail.unitPrice,
      detail.subtotal,
      detail.createdAt,
      detail.updatedAt,
    )
  }

  async findByOrderId(orderId: number): Promise<OrderDetail[]> {
    const orderDetails = await OrderDetailModel.findAll({
      where: { orderId },
      include: ["product"],
    })
    return orderDetails.map(
      (detail) =>
        new OrderDetail(
          detail.id,
          detail.orderId,
          detail.productId,
          detail.quantity,
          detail.unitPrice,
          detail.subtotal,
          detail.createdAt,
          detail.updatedAt,
        ),
    )
  }

  async create(data: Partial<OrderDetail>): Promise<OrderDetail> {
    const detail = await OrderDetailModel.create(data as any)
    return new OrderDetail(
      detail.id,
      detail.orderId,
      detail.productId,
      detail.quantity,
      detail.unitPrice,
      detail.subtotal,
      detail.createdAt,
      detail.updatedAt,
    )
  }

  async update(id: number, data: Partial<OrderDetail>): Promise<OrderDetail | null> {
    const [affectedRows] = await OrderDetailModel.update(data as any, { where: { id } })
    if (affectedRows === 0) return null

    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await OrderDetailModel.destroy({ where: { id } })
    return affectedRows > 0
  }
}
