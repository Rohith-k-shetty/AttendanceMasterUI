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

//verticals curd operation
const saveVerticalToDb = async (token, data, type) => {
  try {
    let url;
    switch (type) {
      case "Department":
        url = `${API_URL}/vertical/department`;
        break;
      case "Course":
        url = `${API_URL}/vertical/course`;
        break;
      case "Subject":
        url = `${API_URL}/vertical/subject`;
        break;
      default:
        throw new Error("Invalid type");
    }

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Error while saving ${type.toLowerCase()}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getDepartmentById = async (token, id) => {
  try {
    let url = `${API_URL}/vertical/department/getById/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while getting department details:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getCourseById = async (token, id) => {
  try {
    let url = `${API_URL}/vertical/course/getById/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while getting course details:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getSubjectById = async (token, id) => {
  try {
    let url = `${API_URL}/vertical/subject/getById/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while getting subject details:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteVerticalFromDB = async (token, id, type) => {
  try {
    let url;
    switch (type) {
      case "Department":
        url = `${API_URL}/vertical/department/${id}`;
        break;
      case "Course":
        url = `${API_URL}/vertical/course/${id}`;
        break;
      case "Subject":
        url = `${API_URL}/vertical/subject/${id}`;
        break;
      default:
        throw new Error("Invalid type");
    }

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while deleting ${type.toLowerCase()}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateVerticalInDb = async (token, id, data, type) => {
  try {
    let url;
    switch (type) {
      case "Department":
        url = `${API_URL}/vertical/department/${id}`;
        break;
      case "Course":
        url = `${API_URL}/vertical/course/${id}`;
        break;
      case "Subject":
        url = `${API_URL}/vertical/subject/${id}`;
        break;
      default:
        throw new Error("Invalid type");
    }

    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while updating ${type.toLowerCase()}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const activateVerticalInDb = async (token, id, type) => {
  try {
    let url;
    switch (type) {
      case "Department":
        url = `${API_URL}/vertical/department/activate/${id}`;
        break;
      case "Course":
        url = `${API_URL}/vertical/course/activate/${id}`;
        break;
      case "Subject":
        url = `${API_URL}/vertical/subject/activate/${id}`;
        break;
      default:
        throw new Error("Invalid type");
    }

    const response = await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while activating ${type.toLowerCase()}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Business logic for login
export const fetchDepartments = async (token) => {
  return await fetchAllDepartments(token);
};

// Business logic for login
export const fetchYears = async (token) => {
  return await fetchAllYears(token);
};

// Business logic for login
export const fetchCourses = async (token) => {
  return await fetchAllCourses(token);
};

//vertical curd operations start
export const saveVerticalDetail = async (token, id, type) => {
  return await saveVerticalToDb(token, id, type);
};

export const getDepartmentDetail = async (token, id) => {
  return await getDepartmentById(token, id);
};

export const getCourseDetail = async (token, id) => {
  return await getCourseById(token, id);
};

export const getSubjectDetail = async (token, id, type) => {
  return await getSubjectById(token, id, type);
};

export const deleteVerticalDeatil = async (token, id, type) => {
  return await deleteVerticalFromDB(token, id, type);
};

export const updateVerticalDeatil = async (token, id, body, type) => {
  return await updateVerticalInDb(token, id, body, type);
};

export const activateVerticalDeatil = async (token, id, type) => {
  return await activateVerticalInDb(token, id, type);
};
