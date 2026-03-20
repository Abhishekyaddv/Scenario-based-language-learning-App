import axiosInstance from "../utils/axiosInstance";

export const registerUser = (formData) => {
  return axiosInstance.post("/register-user", formData);
};

export const loginUser = (email, password) => {
  return axiosInstance.post("/login-user", email, password);
};

export const updateProfile = (data) =>{
  return axiosInstance.patch("/update-profile", data)
}