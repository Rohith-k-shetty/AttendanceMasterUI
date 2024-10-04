import axios from "axios";

const API_URL = "http://localhost:3001/api"; // The base URL for authentication endpoints

// API call to login
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.data;
};

// Business logic for login
export const loginUser = async (credentials) => {
  const user = await login(credentials); // Call the login API
  return user; // Return the user data
};
