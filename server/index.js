import dotenv from "dotenv";
dotenv.config();
import cors from "cors"; 
import express from 'express'
// import registerRoute from './src/routes/register.js'
// import loginRoute from './src/routes/login.js'
// import userRoute from './src/routes/user.js'
// import updateRoute from './src/routes/updateProfile.js'
// import lessonsRoute from './src/routes/lessons.js'
import authRoute     from './src/routes/auth.js'
import lessonsRoute  from './src/routes/lessons.js'
import progressRoute from './src/routes/progress.js'
import scenarioRoute from './src/routes/scenario.js'
import connectDB from "./src/config/db.js";


const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",                         // ← your React app URL
  credentials: true                                        // ← allows cookies/auth headers
}));

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.use('/api/auth',     authRoute)
app.use('/api/lessons',  lessonsRoute)
app.use('/api/progress', progressRoute)
app.use('/api/scenario', scenarioRoute)



connectDB()

app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
  
})

