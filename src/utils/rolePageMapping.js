// src/utils/rolePageMapping.js

const rolePageMapping = {
  SuperAdmin: {
    pages: [
      {
        page: "SuperAdminPage",
        requiredFilters: ["status", "user"],
      },
      {
        page: "AdminPage",
        requiredFilters: ["course", "status", "user"],
      },
      {
        page: "TeacherPage",
        requiredFilters: ["department", "status", "user"],
      },
      {
        page: "StudentPage",
        requiredFilters: ["course", "status", "year", "user"],
      },
      {
        page: "TablePage",
        requiredFilters: ["course", "year", "user"],
      },
    ],
  },
  Admin: {
    pages: [
      {
        page: "AdminPage",
        requiredFilters: ["Status", "user"],
      },
      {
        page: "TeacherPage",
        requiredFilters: ["status", "user"],
      },
      {
        page: "StudentPage",
        requiredFilters: ["status", "year", "user"],
      },
      {
        page: "TablePage",
        requiredFilters: ["year", "user"],
      },
    ],
  },

  Teacher: {
    pages: [
      {
        page: "TeacherPage",
        requiredFilters: ["status", "user"],
      },
      {
        page: "StudentPage",
        requiredFilters: ["status", "user"],
      },
    ],
  },

  Student: {
    pages: [
      {
        page: "TeacherPage",
        requiredFilters: ["user"],
      },
      {
        page: "StudentPage",
        requiredFilters: ["user"],
      },
    ],
  },
};

export default rolePageMapping;
