/**
 * Validation middleware using class-validator
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature ValidationMiddleware
 */

import type { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { plainToClass } from "class-transformer"

export const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(dtoClass, req.body)
      const errors = await validate(dto)

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => Object.values(error.constraints || {}).join(", "))

        res.status(400).json({
          success: false,
          error: "Validation failed",
          details: errorMessages,
        })
        return
      }

      req.body = dto
      next()
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Validation error",
      })
    }
  }
}
