
import mongoose from "mongoose";

// each individual exchange turn in the conversation
const TurnSchema = new mongoose.Schema({
  speaker: {
    type: String,
    enum: ["ai", "user"],
    required: true,
  },
  aiText: {
    type: String,        // what the AI said in that turn
    default: null,
  },
  userResponse: {
    type: String,        // what the user replied
    default: null,
  },
  score: {
    type: Number,        // 0-100, from GPT validation
    default: null,
  },
  feedback: {
    type: String,        // "Good try! But use 'tengo' here..."
    default: null,
  },
  corrected: {
    type: String,        // ideal response from validator
    default: null,
  },
})

const ScenarioSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scenarioType: {
      type: String,
      required: true,     // "airport_immigration", "coffee_shop" etc.
    },

    language: {
      type: String,
      required: true,     // "Spanish", "French" etc.
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    transcript: {
      type: [TurnSchema], // array of all turns in the session
      default: [],
    },

    overallScore: {
      type: Number,       // average of all turn scores
      default: 0,
    },

    xpEarned: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,     // false if they quit early, true if finished
    },
  },
  { timestamps: true }    // createdAt = when session happened
)

const ScenarioSession = mongoose.model("ScenarioSession", ScenarioSessionSchema);
export default ScenarioSession;