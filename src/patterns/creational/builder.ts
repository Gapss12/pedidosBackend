/**
 * Builder pattern implementation for complex object construction
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Builder
 */

import type { ReportType } from "@/types/global"

export interface ReportConfig {
  type: ReportType
  dateFrom?: Date
  dateTo?: Date
  userId?: string
  includeDetails?: boolean
  format?: "json" | "csv" | "pdf"
  filters?: Record<string, any>
}

export class ReportBuilder {
  private config: Partial<ReportConfig> = {}

  public setType(type: ReportType): ReportBuilder {
    this.config.type = type
    return this
  }

  public setDateRange(from: Date, to: Date): ReportBuilder {
    this.config.dateFrom = from
    this.config.dateTo = to
    return this
  }

  public setUserId(userId: string): ReportBuilder {
    this.config.userId = userId
    return this
  }

  public includeDetails(include = true): ReportBuilder {
    this.config.includeDetails = include
    return this
  }

  public setFormat(format: "json" | "csv" | "pdf"): ReportBuilder {
    this.config.format = format
    return this
  }

  public addFilters(filters: Record<string, any>): ReportBuilder {
    this.config.filters = { ...this.config.filters, ...filters }
    return this
  }

  public build(): ReportConfig {
    if (!this.config.type) {
      throw new Error("Report type is required")
    }

    return {
      type: this.config.type,
      dateFrom: this.config.dateFrom,
      dateTo: this.config.dateTo,
      userId: this.config.userId,
      includeDetails: this.config.includeDetails || false,
      format: this.config.format || "json",
      filters: this.config.filters || {},
    }
  }

  public reset(): ReportBuilder {
    this.config = {}
    return this
  }
}
