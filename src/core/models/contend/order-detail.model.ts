/**
 * Order Detail model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature OrderDetailModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { UserModel } from "./user.model"
import { ProductModel } from "./product.model"
import { OrderModel } from "./order.model"

export class OrderDetailModel extends BaseEntity {
  public orderId!: string
  public productId!: string
  public quantity!: number
 public unitPrice!: number
  public subtotal!: number

  static associate() {
  }
}   

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: OrderModel,
      key: "id",
    },
  },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ProductModel,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
   status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
}

OrderDetailModel.init(attributes, {
  sequelize,
  modelName: "OrderDetail",
  tableName: "orderDetail",
  timestamps: false,
})

OrderDetailModel.belongsTo(OrderModel, { foreignKey: "orderId", as: "order" })
OrderDetailModel.belongsTo(ProductModel, { foreignKey: "productId", as: "product" })
OrderModel.hasMany(OrderDetailModel, { foreignKey: "orderId", as: "details" })
ProductModel.hasMany(OrderDetailModel, { foreignKey: "productId", as: "orderDetails" })

