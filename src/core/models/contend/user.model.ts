/**
 * User model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserModel
 */

import { DataTypes, ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"

export class User extends BaseEntity {
  public name!: string
  public email!: string
  public password!: string
  public type!: string
  public creado_en!: Date

  static associate() {
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
    },
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
  },
  type: {
      type: DataTypes.ENUM("client", "admin"),
      allowNull: false,
      defaultValue: "client",
    },
  creado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}

User.init(attributes, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: true,
})
