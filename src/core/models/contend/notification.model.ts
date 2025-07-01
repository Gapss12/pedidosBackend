/**
 * Notification model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature NotificationModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { NotificationType } from "@/types/global"

export class Notification extends BaseEntity {
  public usuario_id!: string
  public tipo!: NotificationType
  public mensaje!: string
  public leido!: boolean
  public fecha!: Date

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
  tipo: {
    type: DataTypes.ENUM(...Object.values(NotificationType)),
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  leido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}

Notification.init(attributes, {
  sequelize,
  modelName: "Notification",
  tableName: "notificaciones",
  timestamps: false,
})
