import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:3001/api"; // Replace with your actual API URL

// Function to make a GET request with a token
const fetchAllDepartments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/vertical/department/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to make a GET request with a token
const fetchAllYears = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/vertical/year/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to make a GET request with a token
const fetchAllCourses = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/vertical/course/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Business logic for login
export const fetchDepartments = async (token) => {
  const departments = await fetchAllDepartments(token); // Call the login API
  return departments; // Return the user data
};

// Business logic for login
export const fetchYears = async (token) => {
  const years = await fetchAllYears(token); // Call the login API
  return years; // Return the user data
};

// Business logic for login
export const fetchCourses = async (token) => {
  const courses = await fetchAllCourses(token); // Call the login API
  return courses; // Return the user data
};
