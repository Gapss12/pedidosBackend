import type { Request, Response } from "express"
import type { ApiResponse } from "../contend/types/global"

export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    error: `Ruta ${req.originalUrl} no encontrada`,
  }

  res.status(404).json(response)
}
