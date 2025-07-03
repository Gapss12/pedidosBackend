// PATRÓN BUILDER - Construcción paso a paso de reportes
export interface SalesReport {
  title: string
  dateRange: { from: Date; to: Date }
  totalSales: number
  orderCount: number
  topProducts: Array<{ name: string; quantity: number }>
  filters: string[]
}

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
