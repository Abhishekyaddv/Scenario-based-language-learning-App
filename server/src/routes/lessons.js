import express from 'express'
import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))

router.get('/:level', async (req, res) => {
  const level = req.params.level.toLowerCase()

  const validLevels = ['beginner', 'intermediate', 'advanced']
  if (!validLevels.includes(level)) {
    return res.status(400).json({ message: 'Invalid level.' })
  }

  try {
    const filePath = join(__dirname, '../../data', `${level}.json`)
    const fileContent = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    res.status(200).json(data)
  } catch (error) {
    console.error('Error reading lesson file:', error)
    res.status(500).json({ message: 'Could not load lessons.' })
  }
})

export default router