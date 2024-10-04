import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:3001/api"; // Replace with your actual API URL

// Function to make a POST request with a token
const saveUserDetailsToDB = async (token, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/users`, // API endpoint
      body, // This is the body content for the POST request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error while saving user:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to be handled by the calling function
  }
};

// Business logic for saving user details
export const saveUserDeatils = async (token, body) => {
  const user = await saveUserDetailsToDB(token, body); // Call the saveUserDetails API function
  return user; // Return the saved user data
};
