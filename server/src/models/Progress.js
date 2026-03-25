import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,          // one progress document per user
    },

    completedChapters: {
      type: [String],        // e.g. ["beginner_ch1", "beginner_ch2"]
      default: [],
    },

    completedLessons: {
      type: [String],        // e.g. ["beginner_ch1_l1", "beginner_ch1_l2"]
      default: [],
    },

    xp: {
      type: Number,
      default: 0,
    },

    streakDays: {
      type: Number,
      default: 0,
    },

    lastActivityDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", ProgressSchema);
export default Progress;
