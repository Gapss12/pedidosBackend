export interface SalesReport {
  title: string
  dateRange: { from: Date; to: Date }
  totalSales: number
  orderCount: number
  topProducts: Array<{ name: string; quantity: number }>
  filters: string[]
}