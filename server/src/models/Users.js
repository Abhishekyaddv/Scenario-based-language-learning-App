import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    // ── Language learning profile ──
    targetLanguage: {
      type: String,
      default: null,           // e.g. "Spanish", "French", "Japanese"
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    learningGoal: {
      type: String,
      enum: ["travel", "casual", "work", "other"],
      default: null,
    },

    interests: {
      type: [String],          // e.g. ["food", "history", "sports"]
      default: [],
    },

    // ── Progress & gamification ──
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

    // ── Onboarding state ──
    isOnboarded: {
      type: Boolean,
      default: false,           // false until they finish the onboarding flow
    },
  },
  {
    timestamps: true,           // auto adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", UserSchema);
export default User;