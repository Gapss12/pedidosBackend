/**
 * Order Detail model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature OrderDetailModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"

export class OrderDetail extends BaseEntity {
  public pedido_id!: string
  public producto_id!: string
  public cantidad!: number
  public precio_unitario!: number

  static associate() {
  }
}   

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  pedido_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "pedidos",
      key: "id",
    },
  },
  producto_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "productos",
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}

OrderDetail.init(attributes, {
  sequelize,
  modelName: "OrderDetail",
  tableName: "detalle_pedido",
  timestamps: false,
})
