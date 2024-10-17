import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:3001/api";

const saveUserDetailsToDB = async (token, id, body) => {
  try {
    // Filter out fields with empty string or undefined values
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    const response = await axios.put(
      `${API_URL}/users/${id}`, // API endpoint
      filteredBody, // Use filtered body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error while updating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to make a POST request with a token
const upadateUserDetailsToDB = async (token, body) => {
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
    throw error;
  }
};
// Function to make a POST request with a token
const getUserById = async (token, id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error while getting user details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to make a delete user
const deleteUserFromDB = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error while deleting user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const resetUserPasswordInDB = async (token, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/reset-password/${id}`,
      {}, // An empty object as the body if no data is required
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error while resetting user password:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const activateUserInDB = async (token, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/activate/${id}`,
      {}, // An empty object as the body if no data is required
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error while Activating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const saveUserDeatils = async (token, body) => {
  const user = await upadateUserDetailsToDB(token, body);
  return user;
};

export const updateUserDeatil = async (token, id, body) => {
  const user = await saveUserDetailsToDB(token, id, body);
  return user;
};

export const geteditUserById = async (token, id) => {
  const user = await getUserById(token, id);
  return user;
};

export const deleteUserDeatil = async (token, id) => {
  const user = await deleteUserFromDB(token, id);
  return user;
};

export const resetUserPassword = async (token, id) => {
  const user = await resetUserPasswordInDB(token, id);
  return user;
};

export const activateUserDetail = async (token, id) => {
  const user = await activateUserInDB(token, id);
  return user;
};
