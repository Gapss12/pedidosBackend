/**
 * Order Detail Routes
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature OrderDetailRoutes
 */

import { Router } from "express"
import { OrderDetailController } from "./controllers/OrderDetailController"

const router = Router()
const orderDetailController = new OrderDetailController()

router.get("/", orderDetailController.getAllOrderDetails)
router.get("/:id", orderDetailController.getOrderDetailById)
router.get("/order/:orderId", orderDetailController.getOrderDetailsByOrderId)
router.post("/", orderDetailController.createOrderDetail)
router.put("/:id", orderDetailController.updateOrderDetail)
router.delete("/:id", orderDetailController.deleteOrderDetail)

export default router
