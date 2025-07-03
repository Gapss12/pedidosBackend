/**
 * Global type definitions for the application
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature GlobalTypes
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationOptions {
  page: number
  limit: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export enum UserType {
  CLIENT = "client",
  ADMIN = "admin",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PricingStrategyType {
  FIXED = "fixed",
  VOLUME_DISCOUNT = "volume_discount",
  PROMOTION = "promotion",
}
