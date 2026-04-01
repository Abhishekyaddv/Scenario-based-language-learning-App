import { GoogleGenerativeAI } from '@google/generative-ai'


// 1. Generate scenario script
export async function generateScenarioScript({ situation, language, level, interests }) {

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

const prompt = `You are a ${language} language practice assistant.
Generate a short, realistic conversation to help a ${level} learner practice ${language}.

STRICT FIELD RULES — follow exactly for every turn:
1. "text" for "ai" turns → write in ${language} ONLY (never English).
2. "translation" for "ai" turns → write the English meaning of that ${language} line.
3. "text" for "user_prompt" turns → write in ${language} ONLY (the phrase the learner should say).
4. "translation" for "user_prompt" turns → write the English meaning of that hint.
5. NEVER put English in a "text" field. NEVER put ${language} in a "translation" field.
6. The situation describes the physical setting only — do NOT change the language based on location.
   Example: situation "asking directions in Paris", language "Spanish" → all "text" fields in Spanish.

User's situation: "${situation}"
User interests: ${interests.join(', ')}.
User level: ${level}.

EXAMPLE of correct output structure for Spanish (use this as a formatting guide):
{
  "title": "Ordering at a Café",
  "turns": [
    { "speaker": "ai", "text": "¡Buenas tardes! ¿Qué le pongo?", "translation": "Good afternoon! What can I get you?" },
    { "speaker": "user_prompt", "text": "Quiero un café con leche, por favor.", "translation": "I'd like a coffee with milk, please." },
    { "speaker": "ai", "text": "Claro, ¿algo más?", "translation": "Of course, anything else?" },
    { "speaker": "user_prompt", "text": "No, gracias. ¿Cuánto es?", "translation": "No thank you. How much is it?" }
  ]
}

Now generate a similar conversation for the situation above in ${language}.
Return JSON only, no extra text. Maximum 5 turns total.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

// 2. Validate user response
export async function validateUserResponse({ aiLine, userResponse, language, level }) {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

const prompt = `You are a ${language} language teacher evaluating a student's spoken response.
The entire conversation is in ${language}.

AI said (in ${language}): "${aiLine}"
Student (${level} level) replied: "${userResponse}"

RULES:
- Score purely on ${language} accuracy, grammar, vocabulary, and relevance to the AI line.
- "feedback" must be one short encouraging tip written in English.
- "corrected" must be the ideal response written in ${language} (not English, not any other language).
- If the student replied in the wrong language, score it below 30 and note it in feedback.

Return JSON only, no extra text:
{"correct":true/false,"score":0-100,"feedback":"one English tip","corrected":"ideal response in ${language}"}`
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}