/**
 * User routes for managing user-related operations.
 * @author Gabriel Guzman
 * @date 2025-07-04
 * @signature UserRoutes
 */
import { Router } from "express"
import { UserController } from "./controllers/UserController"

const router = Router()
const userController = new UserController()

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

export default router
