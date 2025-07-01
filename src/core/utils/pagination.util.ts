/**
 * Pagination utility functions
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature PaginationUtil
 */

import type { PaginationOptions } from "@/types/global"

export class PaginationUtil {
  static createPaginationOptions(page = 1, limit = 10): PaginationOptions {
    const normalizedPage = Math.max(1, page)
    const normalizedLimit = Math.min(Math.max(1, limit), 100) // Max 100 items per page

    return {
      page: normalizedPage,
      limit: normalizedLimit,
      offset: (normalizedPage - 1) * normalizedLimit,
    }
  }

  static createPaginationResponse(data: any[], total: number, options: PaginationOptions) {
    return {
      data,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        totalPages: Math.ceil(total / options.limit),
      },
    }
  }
}
