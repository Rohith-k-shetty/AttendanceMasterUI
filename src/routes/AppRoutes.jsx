import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SuperAdminPage from "../pages/SuperAdminPage";
import AdminPage from "../pages/AdminPage";
import TeacherPage from "../pages/TeacherPage";
import StudentPage from "../pages/StudentPage";
import TablePage from "../pages/TablePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />{" "}
      {/* Ensure HomePage is rendered here */}
      <Route path="/users/super-admin" element={<SuperAdminPage />} />
      <Route path="/users/admins" element={<AdminPage />} />
      <Route path="/users/teacher" element={<TeacherPage />} />
      <Route path="/users/student" element={<StudentPage />} />
      {/* Uncomment if needed */}
      {/* <Route path="/attendance-book/view" element={<AttendanceBookViewPage />} />
      <Route path="/attendance-book/add" element={<AttendanceBookAddPage />} /> */}
      <Route path="/table" element={<TablePage />} />
    </Routes>
  );
};

export default AppRoutes;
