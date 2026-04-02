import axiosInstance from "../utils/axiosInstance";

// ── Auth ──
export const registerUser = (formData) => {
  return axiosInstance.post("/auth/register-user", formData);
};

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login-user", data);
};

export const updateProfile = (data) => {
  return axiosInstance.patch("/auth/update-profile", data);
};

export const getMe = () => {
  return axiosInstance.get("/auth/me");
};

// ── Lessons ──
export const fetchChapters = (level) => {
  return axiosInstance.get(`/lessons/${level}`);
};

export const fetchLessonsByChapter = (level, chapterId) => {
  return axiosInstance.get(`/lessons/${level}/${chapterId}`);
};

// ── Progress ──
export const fetchProgress = () => {
  return axiosInstance.get("/progress");
};

export const updateProgress = (data) => {
  return axiosInstance.post("/progress/update", data);
};

// ── Scenario ──
export const generateScenario = (data) => {
  return axiosInstance.post("/scenario/generate", data);
};

export const validateTurn = (data) => {
  return axiosInstance.post("/scenario/validate", data);
};

export const saveScenarioSession = (data) => {
  return axiosInstance.post("/scenario/save", data);
};

export const fetchScenarioHistory = () => {
  return axiosInstance.get("/scenario/history");
};