import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/";

const searchDepartmentByFields = async (token, query) => {
  try {
    const params = new URLSearchParams();
    // Append only non-empty query parameters
    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }
    if (query.role !== undefined && query.role !== "") {
      params.append("role", query.role);
    }
    if (query.id !== undefined && query.id !== "") {
      params.append("id", query.id);
    }
    // Add limit and offset to the query parameters
    if (query.limit !== undefined && query.limit !== "") {
      params.append("limit", query.limit);
    }
    if (query.offset !== undefined && query.offset !== "") {
      params.append("offset", query.offset);
    }

    let url = `${API_BASE_URL}vertical/department/search?${params.toString()}`;

    // Make the API request with authorization token
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const searchCourseByFields = async (token, query) => {
  try {
    const params = new URLSearchParams();
    // Append only non-empty query parameters
    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }
    if (query.role !== undefined && query.role !== "") {
      params.append("role", query.role);
    }
    if (query.id !== undefined && query.id !== "") {
      params.append("id", query.id);
    }
    // Add limit and offset to the query parameters
    if (query.limit !== undefined && query.limit !== "") {
      params.append("limit", query.limit);
    }
    if (query.offset !== undefined && query.offset !== "") {
      params.append("offset", query.offset);
    }

    let url = `${API_BASE_URL}vertical/course/search?${params.toString()}`;

    // Make the API request with authorization token
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const searchSubjectByFields = async (token, query) => {
  try {
    const params = new URLSearchParams();
    // Append only non-empty query parameters
    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }
    if (query.role !== undefined && query.role !== "") {
      params.append("role", query.role);
    }
    if (query.id !== undefined && query.id !== "") {
      params.append("id", query.id);
    }
    // Add limit and offset to the query parameters
    if (query.limit !== undefined && query.limit !== "") {
      params.append("limit", query.limit);
    }
    if (query.offset !== undefined && query.offset !== "") {
      params.append("offset", query.offset);
    }

    let url = `${API_BASE_URL}vertical/subject/search?${params.toString()}`;

    // Make the API request with authorization token
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

// Business logic for fetching user details
export const fetchdepartmentData = async (token, query) => {
  const users = await searchDepartmentByFields(token, query);
  return users;
};

// Business logic for fetching user details
export const fetchCourseData = async (token, query) => {
  const users = await searchCourseByFields(token, query);
  return users;
};

// Business logic for fetching user details
export const fetchSubjectData = async (token, query) => {
  const users = await searchSubjectByFields(token, query);
  return users;
};
