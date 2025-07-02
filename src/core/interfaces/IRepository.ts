/**
 * DTO for creating a new user
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature IRepository
 */
export interface IRepository<T, CreateDTO, UpdateDTO> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T | null>
  delete(id: string): Promise<boolean>
}