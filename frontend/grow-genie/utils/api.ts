import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true, 
});

// Login User
export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/login", { email, password });
  // Store the token after login
  if (res.data.token) {
    localStorage.setItem("authToken", res.data.token); 
  }
  return res.data;
};

// Register User
export const registerUser = async (name: string, email: string, password: string) => {
  const res = await API.post("/register", { name, email, password }); 
  return res.data;
};

// Verify User (Check if user is logged in)
export const verifyUser = async () => {
  const token = localStorage.getItem("authToken"); 
  if (!token) {
    throw new Error("No token found");
  }

  const res = await API.post("/verifyUser", {}, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return res.data;
};
