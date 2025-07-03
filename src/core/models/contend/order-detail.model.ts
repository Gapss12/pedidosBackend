/**
 * Order Detail model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature OrderDetailModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { User } from "./user.model"
import { Product } from "./product.model"
import { Order } from "./order.model"

export class OrderDetail extends BaseEntity {
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
      model: "pedidos",
      key: "id",
    },
  },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
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

OrderDetail.init(attributes, {
  sequelize,
  modelName: "OrderDetail",
  tableName: "orderDetail",
  timestamps: false,
})

OrderDetail.belongsTo(Order, { foreignKey: "orderId", as: "order" })
OrderDetail.belongsTo(Product, { foreignKey: "productId", as: "product" })
Order.hasMany(OrderDetail, { foreignKey: "orderId", as: "details" })
Product.hasMany(OrderDetail, { foreignKey: "productId", as: "orderDetails" })

