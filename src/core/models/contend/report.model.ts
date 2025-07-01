/**
 * Report model definition using Sequelize
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ReportModel
 */

import { DataTypes, type ModelAttributes } from "sequelize"
import { BaseEntity } from "@/core/entities/base.entity"
import { sequelize } from "@/config/sequelize"
import { ReportType } from "@/types/global"

export class Report extends BaseEntity {
  public nombre!: string
  public tipo!: ReportType
  public contenido!: string
  public generado_en!: Date

  static associate() {
    // Associations will be defined here
  }
}

const attributes: ModelAttributes = {
  ...BaseEntity.getBaseAttributes(),
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM(...Object.values(ReportType)),
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  generado_en: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}

Report.init(attributes, {
  sequelize,
  modelName: "Report",
  tableName: "reportes",
  timestamps: false,
})
