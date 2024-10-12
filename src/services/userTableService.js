import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/";

const searchUsersByFields = async (token, query) => {
  try {
    const params = new URLSearchParams();
    // Append only non-empty query parameters
    if (query.departmentId !== undefined && query.departmentId !== "") {
      params.append("departmentId", query.departmentId);
    }
    if (query.courseId !== undefined && query.courseId !== "") {
      params.append("courseId", query.courseId);
    }
    if (query.yearId !== undefined && query.yearId !== "") {
      params.append("yearId", query.yearId);
    }
    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }
    if (query.role !== undefined && query.role !== "") {
      params.append("role", query.role);
    }
    if (query.userId !== undefined && query.userId !== "") {
      params.append("userId", query.userId);
    }
    // Add limit and offset to the query parameters
    if (query.limit !== undefined && query.limit !== "") {
      params.append("limit", query.limit);
    }
    if (query.offset !== undefined && query.offset !== "") {
      params.append("offset", query.offset);
    }

    // Construct a new URL with the query parameters
    const url = `${API_BASE_URL}users/search/singleFeilds?${params.toString()}`;

    // Make the API request with authorization token
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Business logic for fetching user details
export const fetchUserData = async (token, query) => {
  const users = await searchUsersByFields(token, query);
  return users;
};
