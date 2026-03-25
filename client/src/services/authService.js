import axiosInstance from "../utils/axiosInstance";

export const registerUser = (formData) => {
  return axiosInstance.post("/register-user", formData);
};

export const loginUser = (data) => {
  return axiosInstance.post("/login-user", data);
};

export const updateProfile = (data) =>{
  return axiosInstance.patch("/update-profile", data)
}


export const fetchChapters = (level) => {
  return axiosInstance.get(`/lessons/${level}`)
}

export const fetchProgress = () => {
  return axiosInstance.get("/progress");
};