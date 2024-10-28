import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/users/AdminPage";
import TeacherPage from "../pages/users/TeacherPage";
import StudentPage from "../pages/users/StudentPage";
import SuperAdminPage from "../pages/users/SuperAdminPage";
import TablePage from "../pages/TablePage";
import DepartmentPage from "../pages/verticals/DepartmentPage";
import CoursePage from "../pages/verticals/CoursePage";
import SubjectPage from "../pages/verticals/SubjectPage";
import AddAttendanceBookPage from "../pages/attendanceBook/AddAttendanceBookPage";
import ManageAttendanceBookPage from "../pages/attendanceBook/ManageAttendanceBookPage";
import SignIn from "../pages/sign-in/SignIn";

const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Protecting routes based on user role */}
      <Route
        path="/users/super-admin"
        element={
          isAuthenticated ? <SuperAdminPage /> : <Navigate to="/sign-in" />
        }
      />
      <Route
        path="/users/admins"
        element={isAuthenticated ? <AdminPage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/users/teacher"
        element={isAuthenticated ? <TeacherPage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/users/student"
        element={isAuthenticated ? <StudentPage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/table"
        element={isAuthenticated ? <TablePage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/departments"
        element={
          isAuthenticated ? <DepartmentPage /> : <Navigate to="/sign-in" />
        }
      />
      <Route
        path="/courses"
        element={isAuthenticated ? <CoursePage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/subjects"
        element={isAuthenticated ? <SubjectPage /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/attendance-book/add"
        element={
          isAuthenticated ? (
            <AddAttendanceBookPage />
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />

      <Route
        path="/attendance-book/manage"
        element={
          isAuthenticated ? (
            <ManageAttendanceBookPage />
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />

      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
