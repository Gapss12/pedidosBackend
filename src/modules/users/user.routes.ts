/**
 * User routes configuration
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature UserRoutes
 */

import { Router } from "express"
import { UserController } from "./controllers/controller"
import { UserService } from "./services/user.service"
import { UserRepository } from "./repositories/user.repository"
import { validateDTO } from "@/core/middlewares/validation.middleware"
import { authenticateToken, authorizeRoles } from "@/core/middlewares/auth.middleware"
import { CreateUserDTO } from "./dtos/create-user.dto"
import { UpdateUserDTO } from "./dtos/update-user.dto"
import { UserRole } from "@/types/global"

// Dependency injection
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const router = Router()

// Public routes
router.post("/register", validateDTO(CreateUserDTO), userController.create)
router.post("/login", userController.login)

// Protected routes
router.use(authenticateToken)
router.get("/profile", userController.getProfile)
router.put("/profile", validateDTO(UpdateUserDTO), userController.update)

// Admin only routes
router.get("/", authorizeRoles(UserRole.ADMIN), userController.getAll)
router.get("/:id", authorizeRoles(UserRole.ADMIN), userController.getById)
router.put("/:id", authorizeRoles(UserRole.ADMIN), validateDTO(UpdateUserDTO), userController.update)
router.delete("/:id", authorizeRoles(UserRole.ADMIN), userController.delete)

export { router as userRoutes }
