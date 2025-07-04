/**
 * Server entry point
 * @author Gabriel Guzman
 * @date 2025-07-01
 * @signature Server
 */

import app from "./src/app"
import { sequelize } from "./src/config/database"

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate()
    console.log("Conexión a la base de datos establecida correctamente")

    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: false })
      console.log(" Modelos sincronizados")
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    })
  } catch (error) {
    console.error(" Error al iniciar el servidor:", error)
    process.exit(1)
  }
}

startServer()
