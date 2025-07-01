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
  offset: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum InventoryMovementType {
  IN = "in",
  OUT = "out",
  ADJUSTMENT = "adjustment",
}

export enum NotificationType {
  ORDER = "order",
  INVENTORY = "inventory",
  SYSTEM = "system",
}

export enum ReportType {
  SALES = "sales",
  INVENTORY = "inventory",
  USERS = "users",
}
