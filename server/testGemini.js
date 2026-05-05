import dotenv from 'dotenv';
dotenv.config();
import { generateFlashcardsScript } from './src/services/gemini.js';

async function test() {
  try {
    const res = await generateFlashcardsScript({
      topic: 'Navigating the airport',
      language: 'Spanish',
      level: 'Beginner'
    });
    console.log("Success:", res);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
