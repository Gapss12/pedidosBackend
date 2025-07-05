/**
 * Interface para la construcción de reportes de ventas.
 * Define los métodos necesarios para construir un reporte de ventas.
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature ReportBuilder
 */

// PATRÓN BUILDER - Construcción paso a paso de reportes
import { SalesReport } from "@/core/interfaces/ISaleReport"

export class ReportBuilder {
  private report: Partial<SalesReport> = {}

  setTitle(title: string): ReportBuilder {
    this.report.title = title
    return this
  }
  setDateRange(from: Date, to: Date): ReportBuilder {
    this.report.dateRange = { from, to }
    return this
  }
  setTotalSales(total: number): ReportBuilder {
    this.report.totalSales = total
    return this
  }
  setOrderCount(count: number): ReportBuilder {
    this.report.orderCount = count
    return this
  }
  setTopProducts(products: Array<{ name: string; quantity: number }>): ReportBuilder {
    this.report.topProducts = products
    return this
  }
  addFilter(filter: string): ReportBuilder {
    if (!this.report.filters) {
      this.report.filters = []
    }
    this.report.filters.push(filter)
    return this
  }
  build(): SalesReport {
    if (!this.report.title || !this.report.dateRange) {
      throw new Error("Título y rango de fechas son requeridos")
    }

    return {
      title: this.report.title,
      dateRange: this.report.dateRange,
      totalSales: this.report.totalSales || 0,
      orderCount: this.report.orderCount || 0,
      topProducts: this.report.topProducts || [],
      filters: this.report.filters || [],
    }
  }

  reset(): ReportBuilder {
    this.report = {}
    return this
  }
}


const report = new ReportBuilder()
  .setTitle("Reporte Mensual")
  .setDateRange(new Date('2024-01-01'), new Date('2024-01-31'))
  .setTotalSales(15000)
  .addFilter("productos > $100")
  .build()