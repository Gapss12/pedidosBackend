/**
 * Generic repository interface following Repository pattern
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature IRepository
 */

import type { PaginationOptions } from "@/types/global"

export interface IRepository<T, CreateDTO, UpdateDTO> {
  findAll(options?: PaginationOptions): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T | null>
  delete(id: string): Promise<boolean>
  count(): Promise<number>
}
