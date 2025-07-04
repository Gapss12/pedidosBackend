
/**
 * OrderProcessFacade - Facade para manejar el proceso de creación y cancelación de pedidos
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature OrderProcessFacade
 */
import { OrderService } from "./OrderService"
import { OrderDetailService } from "../../orderDetails/services/OrderDetailService"
import { ProductService } from "../../product/services/ProductService"
import { UserService } from "../../users/services/UserService"
import { NotificationManager } from "../../users/services/NotificationManager"
import { PaymentAdapterFactory } from "@/core/utils/paymentAdapter"
import type { CreateOrderDto } from "../dtos/CreateOrderDto"
import type { Order } from "@/core/entities/Order"
import { AppError } from "@/core/middlewares/errorHandler"

export class OrderProcessFacade {
  private orderService: OrderService
  private orderDetailService: OrderDetailService
  private productService: ProductService
  private userService: UserService
  private notificationManager: NotificationManager

  constructor() {
    this.orderService = new OrderService()
    this.orderDetailService = new OrderDetailService()
    this.productService = new ProductService()
    this.userService = new UserService()
    this.notificationManager = NotificationManager.getInstance()
  }

  async processOrder(orderData: CreateOrderDto): Promise<Order> {
    try {
      // 1. Validar usuario
      const user = await this.userService.getUserById(orderData.userId)

      // 2. Validar productos y stock
      let totalAmount = 0
      for (const item of orderData.items) {
        const product = await this.productService.getProductById(item.productId)
        const hasStock = await this.productService.checkStock(item.productId, item.quantity)

        if (!hasStock) {
          throw new AppError(`Stock insuficiente para el producto: ${product.name}`, 400)
        }

        totalAmount += product.price * item.quantity
      }

      // 3. Procesar pago
      if (orderData.paymentMethod) {
        const paymentAdapter = PaymentAdapterFactory.createAdapter(orderData.paymentMethod)
        const paymentSuccess = await paymentAdapter.processPayment(totalAmount, "dummy-token")

        if (!paymentSuccess) {
          throw new AppError("Error en el procesamiento del pago", 400)
        }
      }

      // 4. Crear pedido
      const order = await this.orderService.createOrder({
        userId: orderData.userId,
        status: "confirmed",
        total: totalAmount,
      })

      // 5. Crear detalles del pedido y reducir stock
      for (const item of orderData.items) {
        const product = await this.productService.getProductById(item.productId)

        await this.orderDetailService.createOrderDetail({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
          subtotal: product.price * item.quantity,
        })

        // Reducir stock
        await this.productService.reduceStock(item.productId, item.quantity)
      }

      // 6. Notificar
      this.notificationManager.notify("order_created", {
        orderId: order.id,
        userEmail: user.email,
        total: totalAmount,
      })

      return order
    } catch (error) {
      console.error("Error en procesamiento de pedido:", error)
      throw error
    }
  }

  async cancelOrder(orderId: number): Promise<void> {
    // 1. Obtener pedido y sus detalles
    const order = await this.orderService.getOrderById(orderId)
    const orderDetails = await this.orderDetailService.getOrderDetailsByOrderId(orderId)

    // 2. Restaurar stock
    for (const detail of orderDetails) {
      const product = await this.productService.getProductById(detail.productId)
      const newStock = product.stock + detail.quantity
      await this.productService.updateProduct(detail.productId, { stock: newStock })
    }

    // 3. Actualizar estado del pedido
    await this.orderService.updateOrder(orderId, { status: "cancelled" })

    // 4. Notificar
    this.notificationManager.notify("order_cancelled", { orderId })
  }
}
