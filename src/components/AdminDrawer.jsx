import React, { useState } from "react";
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
import { SuperAdminForm } from "./forms/superAdminForm";
import { AdminForm } from "./forms/AdminForm";
import { TeacherForm } from "./forms/TeacherForm";
import { StudentForm } from "./forms/StudentForm";
import PersonIcon from "@mui/icons-material/Person";

export default function AdminDrawer({
  open,
  onClose,
  role,
  departments,
  years,
}) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
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

  // Reset form and errors
  const handleReset = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
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
    setErrors({}); // Clear errors on reset
  };

  const validateForm = () => {
    const newErrors = {};

    // Step 1: Validate Name
    if (!formData.name) {
      setErrors({ name: "Name is required" });
      return false; // Stop validation here
    }

    // Step 2: Validate Username
    if (!formData.username) {
      setErrors({ username: "Username is required" });
      return false; // Stop validation here
    }

    // Step 3: Validate Password
    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return false; // Stop validation here
    } else {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
      if (!passwordPattern.test(formData.password)) {
        setErrors({
          password:
            "Password must have at least 1 capital letter, 1 number, and 1 special character",
        });
        return false; // Stop validation here
      }
    }

    // Step 4: Validate Confirm Password
    if (!formData.confirmPassword) {
      setErrors({ confirmPassword: "Confirm password is required" });
      return false; // Stop validation here
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords must match" });
      return false; // Stop validation here
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
        if (!formData.departmentId) {
          setErrors({ departmentId: "Department is required" });
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
          setErrors({ courseId: "course is required" });
          return false;
        }
        if (!formData.yearId) {
          setErrors({ yearId: "Year is required" });
          return false;
        }
        if (formData.parentEmail) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(formData.parentEmail)) {
            setErrors({ parentEmail: "Invalid email address" });
            return false;
          }
        }

        break;
      default:
        break;
    }

    // If no errors
    setErrors({}); // Clear previous errors if all fields pass validation
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form Data:", formData);
    }
  };

  // Render form component based on the role
  const renderFormByRole = () => {
    switch (role) {
      case "SuperAdmin":
        return (
          <SuperAdminForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "Admin":
        return (
          <AdminForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            departments={departments}
          />
        );
      case "Teacher":
        return (
          <TeacherForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            departments={departments}
            years={years}
          />
        );
      case "Student":
        return (
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            departments={departments}
            years={years}
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
      {/* Centered header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" align="center">
          Add New {role}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: "16px" }} // Close icon on the right
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Centered logo icon */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80 }}>
          {" "}
          {/* Bigger avatar */}
          <PersonIcon fontSize="large" />
        </Avatar>
      </Box>

      {/* Center the form */}
      <Box
        component="form"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center", // Centers the form horizontally
        }}
      >
        <Box sx={{ width: "90%" }}>
          {" "}
          {/* Limits form width */}
          <Grid container spacing={2}>
            {renderFormByRole()}
          </Grid>
          {/* Centered Save and Reset buttons with margin */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
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
