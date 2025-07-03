/**
 * User model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserModel
 */

import { DataTypes, ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { UserRole } from "@/types/global"

export class User extends BaseEntity {
  public name!: string
  public email!: string
  public password!: string
  public rol!: UserRole
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
  rol: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
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
