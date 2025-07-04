/**
 * Base entity configuration for Sequelize models
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature BaseEntity
 */

import { Model, DataTypes, ModelAttributes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize"

export interface BaseEntityAttributes {
  id: Number
  createdAt: Date
  updatedAt: Date
}

export abstract class BaseEntity<
  M extends Model = any
> extends Model<InferAttributes<M>, InferCreationAttributes<M>> {
  declare id: CreationOptional<number>
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>

  public static getBaseAttributes(): ModelAttributes {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }
  }
}