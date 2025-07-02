/**
 * PATRÓN FACTORY METHOD
 *
 * Propósito: Crear objetos sin especificar la clase exacta del objeto que será creado
 *
 * Justificación: Permite crear diferentes tipos de servicios de manera uniforme,
 * facilitando el mantenimiento y la extensibilidad del código.
 *
 * Implementación: Factory abstracto con implementaciones concretas para cada módulo
 */

// Interfaz base para todos los servicios
import { IRepository } from "../../../core/interfaces/IRepository"
import { IService } from "@/core/interfaces/service.interface"

// Factory abstracto
export abstract class ServiceFactory<T, CreateDTO, UpdateDTO> {
  // Método factory que debe ser implementado por las clases concretas
  abstract createService(): IService<T, CreateDTO, UpdateDTO>

  // Método template que utiliza el factory method
  public getService(): IService<T, CreateDTO, UpdateDTO> {
    console.log(`🏭 Factory: Creando servicio usando ${this.constructor.name}`)
    return this.createService()
  }
}

// Ejemplo de uso del patrón
export class ServiceManager {
  private services: Map<string, any> = new Map()

  registerFactory<T, CreateDTO, UpdateDTO>(name: string, factory: ServiceFactory<T, CreateDTO, UpdateDTO>): void {
    const service = factory.getService()
    this.services.set(name, service)
    console.log(`✅ Servicio '${name}' registrado exitosamente`)
  }

  getService<T>(name: string): T {
    const service = this.services.get(name)
    if (!service) {
      throw new Error(`Servicio '${name}' no encontrado`)
    }
    return service
  }
}
