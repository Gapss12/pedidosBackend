/**
 * Generic service interface
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature IService
 */

import type { ApiResponse, PaginatedResponse, PaginationOptions } from "@/types/global"

export interface IService<T, CreateDTO, UpdateDTO> {
  getAll(options?: PaginationOptions): Promise<PaginatedResponse<T>>
  getById(id: string): Promise<ApiResponse<T>>
  create(data: CreateDTO): Promise<ApiResponse<T>>
  update(id: string, data: UpdateDTO): Promise<ApiResponse<T>>
  delete(id: string): Promise<ApiResponse<void>>
}
