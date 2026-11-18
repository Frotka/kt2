import express from "express"
import fs from "fs"
import { PORT, UPLOAD_DIR } from "./src/config.js"
import { router } from "./src/routes.js"

fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const app = express()

app.use(express.json())
app.use("/uploads", express.static(UPLOAD_DIR))
app.use("/api", router)

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})