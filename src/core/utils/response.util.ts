/**
 * Response utility functions for consistent API responses
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ResponseUtil
 */

import type { ApiResponse, PaginatedResponse } from "@/types/global"

export class ResponseUtil {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    }
  }

  static error(error: string, message?: string): ApiResponse {
    return {
      success: false,
      error,
      message,
    }
  }

  static paginated<T>(data: T[], pagination: any, message?: string): PaginatedResponse<T> {
    return {
      success: true,
      data,
      pagination,
      message,
    }
  }
}
