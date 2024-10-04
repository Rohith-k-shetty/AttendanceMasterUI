import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:3001/api";

const fetchUsersBySearch = async (token, query) => {
  try {
    const department = query.departmentId
      ? `departmentId=${query.departmentId}&`
      : "departmentId=All&";
    const course = query.courseId
      ? `courseId=${query.courseId}&`
      : "courseId=All&";
    const role = query.role ? `role=${query.role}&` : "role=All&";
    // Concatenate the query parameters
    const queryString = `${department}${course}${role}searchTerm=${query.searchTerm}`;
    console.log(`${API_URL}/users/search/byNameOrPhone?${queryString}`);

    const response = await axios.get(
      `${API_URL}/users/search/byNameOrPhone?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to handle it upstream
  }
};

export const fetchUsers = async (token, query) => {
  return await fetchUsersBySearch(token, query);
};
