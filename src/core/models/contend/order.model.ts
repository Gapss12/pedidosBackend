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
import { UserModel } from "./user.model"

export class OrderModel extends BaseEntity {
  public userId!: string
  public status!: OrderStatus
  public total!: number

  static associate() {
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  status: {
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

OrderModel.init(attributes, {
  sequelize,
  tableName: "orders",
  timestamps: true,
})

OrderModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" })
UserModel.hasMany(OrderModel, { foreignKey: "userId", as: "orders" })
