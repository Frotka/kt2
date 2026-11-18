import multer from "multer"
import { UPLOAD_DIR } from "./config.js"

const storage = multer.diskStorage({
  destination: (req, file, func) => func(null, UPLOAD_DIR),
  filename: (req, file, func) => {
    const uniqueName = Date.now() + "-" + file.originalname
    func(null, uniqueName)
  },
})

export const upload = multer({ storage })
