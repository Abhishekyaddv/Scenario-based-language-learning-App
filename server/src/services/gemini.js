import { GoogleGenerativeAI } from '@google/generative-ai'


// 1. Generate scenario script
export async function generateScenarioScript({ situation, language, level, interests }) {

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })


  // const prompt = `
  //   Generate a realistic 5-minute ${language} conversation script 
  //   for a ${level} learner. Situation: ${situation}. 
  //   User interests: ${interests.join(', ')}.
    
  //   Return ONLY a JSON object like this, no extra text:
  //   {
  //     "title": "scenario title",
  //     "turns": [
  //       { "speaker": "ai", "text": "...", "translation": "..." },
  //       { "speaker": "user_prompt", "text": "suggested response hint" }
  //     ]
  //   }
  // `
const prompt = `Generate a realistic ${language} conversation for a ${level} learner.
User's exact situation: "${situation}"
User interests: ${interests.join(', ')}.
Make the conversation authentic to the described context — use appropriate local phrases, 
natural dialogue, and culturally relevant details.
Return JSON only, no extra text:
{"title":"...","turns":[{"speaker":"ai","text":"...","translation":"..."},{"speaker":"user_prompt","text":"hint of what to say"}]}
Maximum 8 turns total.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

// 2. Validate user response
export async function validateUserResponse({ aiLine, userResponse, language, level }) {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })
  // const prompt = `
  //   You are a ${language} language teacher.
  //   The AI said: "${aiLine}"
  //   The ${level} student responded: "${userResponse}"
    
  //   Return ONLY a JSON object, no extra text:
  //   {
  //     "correct": true or false,
  //     "score": 0-100,
  //     "feedback": "short encouraging tip",
  //     "corrected": "ideal response"
  //   }
  // `

const prompt = `You are a ${language} teacher. 
AI said: "${aiLine}"
${level} student replied: "${userResponse}"
Return JSON only, no extra text:
{"correct":true/false,"score":0-100,"feedback":"one tip","corrected":"ideal answer"}`


  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}