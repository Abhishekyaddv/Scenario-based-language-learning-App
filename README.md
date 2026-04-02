# Contexto 🌍
> **Master real-world fluency through AI-powered immersive scenarios.**

Contexto is a next-generation language learning platform that bridges the gap between basic vocabulary flashcards and real-world spontaneous fluency. Moving away from traditional gamified repetition, it plunges users into authentic, LLM-generated conversational scenarios.

Instead of studying for a conversation, you **jump into the conversation** and build flashcards dynamically based on your live performance and zero-latency AI interactions.

## 🚀 Features
* **Zero-Latency AI Roleplay**: Start dynamic, voice-driven scenarios with intelligent AI personas across 40+ languages.
* **Smart Fragmenting**: Monolith learning materials are algorithmically broken down and interleaved with exercises to vastly improve retention.
* **Deep Analytics**: Get instant, actionable feedback mapping your precise grammatical and vocabular mistakes. 
* **Native-TTS System**: Immediate audio localized feedback powered directly by the browser limits external API latency. 
* **Responsive UI Design**: Built mobile-first using modern breakpoints, Tailwind CSS, and Apple-esque Framer Motion scroll abstractions.

---

## 🛠 Tech Stack
* **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, React Router DOM
* **Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT Auth
* **AI Engine:** Google Gemini 2.5 Flash API (`@google/generative-ai`)

---

## 📦 Local Installation & Setup

To clone and run this application locally, you'll need Git and Node.js (which comes with npm) installed on your computer.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Scenario-based-learning-App.git
cd Scenario-based-learning-App
```

### 2. Setup the Server (Backend)
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
# You need a MongoDB cluster connection string
DB_CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=...

# Your JWT standard secret key for Authentication
JWT_SECRET=your_super_secret_jwt_string

# Your Google Gemini Developers API Key
GEMINI_API_KEY=your_gemini_api_key
```

Run the server:
```bash
# Runs on Port 5000 by default
npm run dev
```

### 3. Setup the Client (Frontend)
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
# Point this to your local server url (replace IP with localhost if not testing on a mobile device)
VITE_API_URL=http://localhost:5000/api
```

Run the development UI:
```bash
# Runs on Port 5173 by default
npm run dev
```

### 4. (Optional) Mobile Wi-Fi Testing
If you wish to test the responsive mobile design on your actual phone:
1. Ensure your phone and development computer are on the same Wi-Fi network.
2. Update the `VITE_API_URL` to point to your computer's local IP address (e.g. `192.168.1.XX:5000/api`).
3. Ensure the server's CORS configuration natively allows your local IP. 
4. Run the frontend bound to your host: `npm run dev -- --host`
5. Navigate to your computer's IP address and port `5173` on your smartphone browser.

---

## 📄 License
This project is for demonstrative, educational, and portfolio purposes. 

*Designed and engineered with passion.*
