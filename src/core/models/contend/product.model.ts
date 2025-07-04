/**
 * Product model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ProductModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/database"

export class ProductModel extends BaseEntity {
  public name!: string
  public description!: string
  public price!: number
  public stock!: number

  static associate() {
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 200],
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
}

ProductModel.init(attributes, {
  sequelize,
  modelName: "Product",
  tableName: "products",
  timestamps: true,
})
