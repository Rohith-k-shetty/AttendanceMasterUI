import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SubjectForm } from "../forms/SubjectForm";
import { DepartmentForm } from "../forms/DepartmentForm";
import { CourseForm } from "../forms/CourseForm";
import { useDispatch } from "react-redux";
import SubjectIcon from "@mui/icons-material/Subject";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import {
//   saveSubject,
//   saveDepartment,
//   saveCourse,
// } from "../../features/manage/manageSlice";
import toast from "react-hot-toast";
import { Assessment } from "@mui/icons-material";

export default function AddVerticalDrawer({ open, onClose, type }) {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    departmentName: "",
    departmentCode: "",
    courseName: "",
    courseCode: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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
    setFormData({
      subjectName: "",
      subjectCode: "",
      departmentName: "",
      departmentCode: "",
      courseName: "",
      courseCode: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    switch (type) {
      case "Subject":
        if (!formData.subjectName) {
          setErrors({ subjectName: "Subject name is required" });
          return false;
        }
        if (!formData.subjectCode) {
          setErrors({ subjectCode: "Subject code is required" });
          return false;
        }
        break;
      case "Department":
        if (!formData.departmentName) {
          setErrors({ departmentName: "Department name is required" });
          return false;
        }
        if (!formData.departmentCode) {
          setErrors({ departmentCode: "Department code is required" });
          return false;
        }
        break;
      case "Course":
        if (!formData.courseName) {
          setErrors({ courseName: "Course name is required" });
          return false;
        }
        if (!formData.courseCode) {
          setErrors({ courseCode: "Course code is required" });
          return false;
        }
        break;
      default:
        break;
    }
    setErrors({});
    return true;
  };

  const saveCourse = () => {
    console.log("course");
  };
  const saveDepartment = () => {
    console.log("course");
  };
  const saveSubject = () => {
    console.log("course");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let action;
      switch (type) {
        case "Subject":
          action = saveSubject;
          break;
        case "Department":
          action = saveDepartment;
          break;
        case "Course":
          action = saveCourse;
          break;
        default:
          return;
      }

      dispatch(action(formData))
        .unwrap()
        .then(() => {
          handleReset();
          onClose();
          toast.success(`${type} added successfully.`);
        })
        .catch((error) => {
          console.error("Failed to save:", error);
          toast.error("Failed to save data.");
        });
    }
  };

  const renderFormByType = () => {
    switch (type) {
      case "Subject":
        return (
          <SubjectForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "Department":
        return (
          <DepartmentForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "Course":
        return (
          <CourseForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const renderIconByType = () => {
    switch (type) {
      case "Subject":
        return (
          <Avatar sx={{ width: 80, height: 80 }}>
            <SubjectIcon fontSize="large" />
          </Avatar>
        );
      case "Department":
        return (
          <Avatar sx={{ width: 80, height: 80 }}>
            <AssessmentIcon fontSize="large" />
          </Avatar>
        );
      case "Course":
        return (
          <Avatar sx={{ width: 80, height: 80 }}>
            <AssignmentIcon fontSize="large" />
          </Avatar>
        );
      default:
        return null;
    }
  };

  const error = false;
  const loading = false;
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
          Add New Department
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: "16px" }} // Close icon on the right
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Centered logo icon */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 2 }}>
        {renderIconByType()}
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
        <Box
          sx={{
            width: "90%",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderFormByType()}
          </Grid>

          {error && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography color="error" align="center">
                {error.message}
              </Typography>
            </Box>
          )}

          {/* Centered Save and Reset buttons with margin */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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
