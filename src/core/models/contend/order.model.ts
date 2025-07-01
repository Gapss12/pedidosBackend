/**
 * Order model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature OrderModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { OrderStatus } from "@/types/global"

export class Order extends BaseEntity {
  public usuario_id!: string
  public fecha!: Date
  public estado!: OrderStatus
  public total!: number

  static associate() {
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}

Order.init(attributes, {
  sequelize,
  modelName: "Order",
  tableName: "pedidos",
  timestamps: false,
})
