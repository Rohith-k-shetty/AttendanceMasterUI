import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SuperAdminPage from "../pages/SuperAdminPage";
import AdminPage from "../pages/AdminPage";
import TeacherPage from "../pages/TeacherPage";
import StudentPage from "../pages/StudentPage";
import TablePage from "../pages/TablePage";
import SignIn from "../pages/sign-in/SignIn";
import DepartmentPage from "../pages/DepartmentPage";
import CoursePage from "../pages/CoursePage";
import SubjectPage from "../pages/SubjectPage";

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
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
