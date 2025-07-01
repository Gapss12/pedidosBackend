/**
 * Inventory model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature InventoryModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { InventoryMovementType } from "@/types/global"

export class Inventory extends BaseEntity {
  public producto_id!: string
  public cantidad!: number
  public tipo_movimiento!: InventoryMovementType
  public motivo!: string
  public fecha!: Date

  static associate() {
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
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
  },
  tipo_movimiento: {
    type: DataTypes.ENUM(...Object.values(InventoryMovementType)),
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}

Inventory.init(attributes, {
  sequelize,
  modelName: "Inventory",
  tableName: "inventario",
  timestamps: false,
})
