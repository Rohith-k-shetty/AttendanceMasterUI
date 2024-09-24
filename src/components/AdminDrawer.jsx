import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SuperAdminForm } from "./forms/superAdminForm";
import { AdminForm } from "./forms/AdminForm";
import { TeacherForm } from "./forms/TeacherForm";
import { StudentForm } from "./forms/StudentForm";

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
    phoneNo: "",
    departmentId: "",
    yearId: "",
    parentPhone: "",
    parentEmail: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      phoneNo: "",
      departmentId: "",
      yearId: "",
      parentPhone: "",
      parentEmail: "",
    });
    setErrors({}); // Clear errors on reset
  };

  // Form validation logic based on the role
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
      if (!passwordPattern.test(formData.password)) {
        newErrors.password = "Password Pattern must match";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }
    switch (role) {
      case "SuperAdmin":
        break;
      case "Admin":
        if (!formData.departmentId)
          newErrors.departmentId = "Department is required";
        break;
      case "Teacher":
        if (!formData.departmentId)
          newErrors.departmentId = "Department is required";
        if (!formData.yearId) newErrors.departmentId = "Department is required";
        break;
      case "Student":
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(formData.email)) {
            newErrors.email = "Email must be a valid email address";
          }
        }
        if (!formData.departmentId)
          newErrors.departmentId = "Department is required";
        if (!formData.yearId) newErrors.departmentId = "Year is required";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          width: { xs: 300, sm: 400 },
          p: 2,
          backgroundColor: "background.default",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Add New {role}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Render form based on the role */}
      <Stack spacing={2} component="form" sx={{ width: "100%" }}>
        {renderFormByRole()}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
