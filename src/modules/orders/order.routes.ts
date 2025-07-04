import { Router } from "express"
import { OrderController } from "./controllers/OrderController"

const router = Router()
const orderController = new OrderController()

router.get("/", orderController.getAllOrders)
router.get("/:id", orderController.getOrderById)
router.get("/user/:userId", orderController.getOrdersByUserId)
router.post("/", orderController.createOrder)
router.put("/:id", orderController.updateOrder)
router.post("/:id/cancel", orderController.cancelOrder)

export default router
