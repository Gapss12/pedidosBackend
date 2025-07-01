/**
 * Factory Method pattern implementation for creating services and repositories
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature FactoryMethod
 */

import type { IRepository } from "@/core/interfaces/repostiry.interface"
import type { IService } from "@/core/interfaces/service.interface"

// Abstract Factory for creating complete module ecosystems
export abstract class ModuleFactory<T, CreateDTO, UpdateDTO> {
  abstract createRepository(): IRepository<T, CreateDTO, UpdateDTO>
  abstract createService(): IService<T, CreateDTO, UpdateDTO>
  abstract createController(): any

  // Template method that creates the complete module
  public createModule(): {
    repository: IRepository<T, CreateDTO, UpdateDTO>
    service: IService<T, CreateDTO, UpdateDTO>
    controller: any
  } {
    const repository = this.createRepository()
    const service = this.createService()
    const controller = this.createController()

    return { repository, service, controller }
  }
}

// Factory for creating different types of services based on context
export class ServiceTypeFactory {
  static createService(type: "user" | "product" | "order" | "inventory" | "notification" | "report"): any {
    switch (type) {
      case "user":
        return new (require("@/modules/users/factories/user.factory").UserFactory)().createService()
      case "product":
        return new (require("@/modules/products/factories/product.factory").ProductFactory)().createService()
      case "order":
        return new (require("@/modules/orders/factories/order.factory").OrderFactory)().createService()
      case "inventory":
        return new (require("@/modules/inventory/factories/inventory.factory").InventoryFactory)().createService()
      case "notification":
        return new (require("@/modules/notifications/factories/notification.factory").NotificationFactory)().createService()
      case "report":
        return new (require("@/modules/reports/factories/report.factory").ReportFactory)().createService()
      default:
        throw new Error(`Unknown service type: ${type}`)
    }
  }
}

// Abstract factory for different database implementations
export abstract class DatabaseFactory {
  abstract createConnection(): any
  abstract createQueryBuilder(): any
  abstract createMigrationRunner(): any
}

export class PostgreSQLFactory extends DatabaseFactory {
  createConnection() {
    return require("@/config/sequelize").sequelize
  }

  createQueryBuilder() {
    return require("sequelize").QueryTypes
  }

  createMigrationRunner() {
    return require("sequelize").Umzug
  }
}