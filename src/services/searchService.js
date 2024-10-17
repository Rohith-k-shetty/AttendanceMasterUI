import axios from "axios";

// Define the base URL for your API
const API_URL = "http://localhost:3001/api";

const fetchUsersBySearch = async (token, query) => {
  try {
    const params = new URLSearchParams();

    // Append parameters only if they are defined and not empty
    if (query.departmentId !== undefined && query.departmentId !== "") {
      params.append("departmentId", query.departmentId);
    }
    if (query.courseId !== undefined && query.courseId !== "") {
      params.append("courseId", query.courseId);
    }
    if (query.role !== undefined && query.role !== "") {
      params.append("role", query.role);
    }
    if (query.searchTerm !== undefined && query.searchTerm !== "") {
      params.append("searchTerm", query.searchTerm);
    }

    // Construct the full URL with the query parameters
    const url = `${API_URL}/users/search/byNameOrPhone?${params.toString()}`;

    const response = await axios.get(url, {
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
    throw error; // Re-throw the error to handle it upstream
  }
};

const searchDepartmentFromDB = async (token, query) => {
  try {
    const params = new URLSearchParams();

    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }

    if (query.searchTerm !== undefined && query.searchTerm !== "") {
      params.append("searchTerm", query.searchTerm);
    }

    // Construct the full URL with the query parameters
    const url = `${API_URL}/vertical/department/searchByregx?${params.toString()}`;

    const response = await axios.get(url, {
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
    throw error; // Re-throw the error to handle it upstream
  }
};

const searchCoursesFromDB = async (token, query) => {
  try {
    const params = new URLSearchParams();

    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }

    if (query.searchTerm !== undefined && query.searchTerm !== "") {
      params.append("searchTerm", query.searchTerm);
    }

    // Construct the full URL with the query parameters
    const url = `${API_URL}/vertical/course/searchByregx?${params.toString()}`;

    const response = await axios.get(url, {
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
    throw error; // Re-throw the error to handle it upstream
  }
};

const searchSubjectsFromDB = async (token, query) => {
  try {
    const params = new URLSearchParams();

    if (query.status !== undefined && query.status !== "") {
      params.append("status", query.status);
    }

    if (query.searchTerm !== undefined && query.searchTerm !== "") {
      params.append("searchTerm", query.searchTerm);
    }

    // Construct the full URL with the query parameters
    const url = `${API_URL}/vertical/subject/searchByregx?${params.toString()}`;

    const response = await axios.get(url, {
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
    throw error; // Re-throw the error to handle it upstream
  }
};

export const fetchUsers = async (token, query) => {
  return await fetchUsersBySearch(token, query);
};

export const searchDepartments = async (token, query) => {
  return await searchDepartmentFromDB(token, query);
};

export const searchCourses = async (token, query) => {
  return await searchCoursesFromDB(token, query);
};

export const searchSubjects = async (token, query) => {
  return await searchSubjectsFromDB(token, query);
};
