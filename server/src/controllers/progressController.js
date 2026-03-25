import Progress from "../models/Progress.js";

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.userId;

    // find progress or create empty one if first time
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = await Progress.create({ userId });
    }

    res.status(200).json({ progress });

  } catch (error) {
    console.error("getProgress error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { chapterId, lessonId, xpEarned } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          completedChapters: chapterId,   // addToSet won't duplicate
          completedLessons: lessonId,
        },
        $inc: { xp: xpEarned || 10 },    // add XP, default 10 per lesson
        lastActivityDate: new Date(),
      },
      { new: true, upsert: true }         // upsert creates if doesn't exist
    );

    res.status(200).json({ progress });

  } catch (error) {
    console.error("updateProgress error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};