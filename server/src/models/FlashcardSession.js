import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  expectedAnswer: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  }
});

const flashcardSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
  overallScore: {
    type: Number,
    required: true,
  },
  xpEarned: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.models.FlashcardSession || mongoose.model('FlashcardSession', flashcardSessionSchema);
