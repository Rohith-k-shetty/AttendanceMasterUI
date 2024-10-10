import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Avatar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";

import { StudentEditForm } from "../forms/StudentEditForm";
import {
  selectUserError,
  selectUserLoading,
} from "../../features/users/userSelectors";
import { resetUserState, editUser } from "../../features/users/userSlice";
import { TeacherEditForm } from "../forms/TeacherEditForm";
import { AdminEditForm } from "../forms/AdminEditForm";
import { SuperAdminEditForm } from "../forms/SuperAdminEditForm";

export default function UserEditDrawer({
  open,
  onClose,
  role,
  user,
  departments,
  years,
  courses,
  token,
  userRole,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Initialize form state with user details or empty values
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: role,
    status: "Active",
    email: "",
    gender: "",
    phoneNo: "",
    departmentId: "",
    courseId: "",
    yearId: "",
    parentPhone: "",
    parentEmail: "",
  });

  const [errors, setErrors] = useState({});

  // Populate formData with user details if user is passed
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name || "",
        username: user.username || "",
        role: user.role || role,
        email: user.email || "",
        gender: user.gender || "",
        phoneNo: user.phoneNo || "",
        departmentId: user.departmentId || "",
        courseId: user.courseId || "",
        yearId: user.yearId || "",
        parentPhone: user.parentPhone || "",
        parentEmail: user.parentEmail || "",
      });
    }
  }, [user, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        role: user.role || role,
        email: user.email || "",
        gender: user.gender || "",
        phoneNo: user.phoneNo || "",
        departmentId: user.departmentId || "",
        courseId: user.courseId || "",
        yearId: user.yearId || "",
        parentPhone: user.parentPhone || "",
        parentEmail: user.parentEmail || "",
      });
    } else {
      setFormData({
        name: "",
        username: "",
        role: role,
        status: "Active",
        email: "",
        gender: "",
        phoneNo: "",
        departmentId: "",
        courseId: "",
        yearId: "",
        parentPhone: "",
        parentEmail: "",
      });
    }
    setErrors({});
    dispatch(resetUserState());
  };

  const validateForm = () => {
    if (!formData.name) {
      setErrors({ name: "Name is required" });
      return false;
    }
    if (!formData.username) {
      setErrors({ username: "Username is required" });
      return false;
    }
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        setErrors({ email: "Invalid email address" });
        return false;
      }
    }
    if (!formData.gender) {
      setErrors({ gender: "Gender is required" });
      return false;
    }
    switch (role) {
      case "Admin":
        if (!formData.courseId) {
          setErrors({ courseId: "Department is required" });
          return false;
        }
        break;
      case "Teacher":
        if (!formData.departmentId) {
          setErrors({ departmentId: "Department is required" });
          return false;
        }
        break;
      case "Student":
        if (!formData.courseId) {
          setErrors({ courseId: "Course is required" });
          return false;
        }
        if (!formData.yearId) {
          setErrors({ yearId: "Year is required" });
          return false;
        }
        if (formData.parentEmail !== "") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(formData.parentEmail)) {
            setErrors({ email: "Invalid email address" });
            return false;
          }
        }
        break;
      default:
        break;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (id) => {
    if (validateForm()) {
      dispatch(editUser({ token, id, body: formData }))
        .unwrap()
        .then(() => {
          onClose();
          handleReset();
        })
        .catch((error) => {
          console.error("Failed to edit user:", error);
        });
    }
  };

  const renderFormByRole = () => {
    switch (role) {
      case "SuperAdmin":
        return (
          <SuperAdminEditForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "Admin":
        return (
          <AdminEditForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            departments={departments}
          />
        );
      case "Teacher":
        return (
          <TeacherEditForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            departments={departments}
            years={years}
          />
        );
      case "Student":
        return (
          <StudentEditForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            years={years}
            courses={courses}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "40%",
          p: 2,
          backgroundColor: "background.default",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" align="center">
          Edit {role}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: "16px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
      </Box>
      <Box
        component="form"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Grid container spacing={2}>
            {renderFormByRole()}
          </Grid>
          {error && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Typography color="error" align="center">
                {error.message}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(user.id)}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
