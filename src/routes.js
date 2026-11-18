import { Router } from "express"
import { upload } from "./upload.js"

export const router = Router()

let games = [
  { id: 1, title: "Minecraft", price: 1500, cover: null },
  { id: 2, title: "The Witcher 3", price: 2000, cover: null }
]

router.get("/games", (req, res) => {
  res.status(200).json(games)
})

router.get("/games/:id", (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id))
  if (!game) {
    return res.status(404).json({ error: "Игра не найдена" })
  }
  res.status(200).json(game)
})

router.post("/games", upload.single("cover"), (req, res) => {
  const { title, price } = req.body
  if (!title || !price) {
    return res.status(400).json({ error: "Название и цена обязательны" })
  }

  const newGame = {
    id: games.length > 0 ? games[games.length - 1].id + 1 : 1,
    title,
    price: Number(price),
    cover: req.file ? req.file.filename : null
  }

  games.push(newGame)
  res.status(201).json(newGame)
})

router.put("/games/:id", upload.single("cover"), (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id))
  if (!game) {
    return res.status(404).json({ error: "Игра не найдена" })
  }

  const { title, price } = req.body
  if (title) game.title = title
  if (price) game.price = Number(price)
  if (req.file) game.cover = req.file.filename

  res.status(200).json(game)
})

router.delete("/games/:id", (req, res) => {
  const gameIndex = games.findIndex((g) => g.id === parseInt(req.params.id))
  if (gameIndex === -1) {
    return res.status(404).json({ error: "Игра не найдена" })
  }

  games.splice(gameIndex, 1)
  res.status(200).json({ message: "Игра успешно удалена" })
})
