/**
 * Product Routes - Define las rutas para manejar productos
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature ProductRoutes
 */
import { Router } from "express"
import { ProductController } from "./controllers/ProductController"

const router = Router()
const productController = new ProductController()

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.post("/", productController.createProduct)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)
router.post("/:id/calculate-price", productController.calculatePrice)

export default router
