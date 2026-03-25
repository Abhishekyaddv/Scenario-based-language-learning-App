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

// new route — gets one specific chapter by its ID
router.get('/:level/:chapterId', async (req, res) => {
  const level = req.params.level.toLowerCase()
  const { chapterId } = req.params

  try {
    const filePath = join(__dirname, '../../data', `${level}.json`)
    const fileContent = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    // console.log(data);
    
    // Handle both structures safely:
    // 1. If file is array like yours
    // 2. If file is object { level, chapters }
    let chapters = [];

    if (Array.isArray(data)) {
      const levelObj = data.find(item => item.level.toLowerCase() === level);
      chapters = levelObj?.chapters || [];
    } else {
      chapters = data.chapters || [];
    }
    // find the specific chapter from the array
   const chapter = chapters.find(ch => String(ch.id) === String(chapterId));

    if (!chapter) {
      
      return res.status(404).json({ message: 'Chapter not found.' })
    }

    res.status(200).json({ chapter })

  } catch (error) {
    console.error('Error reading chapter:', error)
    res.status(500).json({ message: 'Could not load chapter.' })
  }
})
export default router