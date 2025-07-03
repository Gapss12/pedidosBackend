import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "../types/global"

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  let statusCode = 500
  let message = "Error interno del servidor"

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
  }

  console.error("Error:", error)

  const response: ApiResponse = {
    success: false,
    error: message,
  }

  res.status(statusCode).json(response)
}
