import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import SubjectIcon from "@mui/icons-material/Subject";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import toast from "react-hot-toast";
import {
  resetModifyVerticalState,
  updateVertical,
} from "../../features/vertical/modifyVerticalSlice"; // Action for updating verticals
import {
  selectModifyVerticalError,
  selectModifyVerticalLoading,
} from "../../features/vertical/modifyVerticalSelectors";

export default function EditVerticalDrawer({
  open,
  onClose,
  type,
  token,
  initialData,
  fetchVerticals,
}) {
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
  const error = useSelector(selectModifyVerticalError);
  const loading = useSelector(selectModifyVerticalLoading);
  // Populate form data when initialData is passed (edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        subjectName: initialData.subjectName || "",
        subjectCode: initialData.subjectCode || "",
        departmentName: initialData.departmentName || "",
        departmentCode: initialData.departmentCode || "",
        courseName: initialData.courseName || "",
        courseCode: initialData.courseCode || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    dispatch(resetModifyVerticalState());
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

  const handleSubmit = (id) => {
    if (validateForm()) {
      let updatedData;
      switch (type) {
        case "Subject":
          updatedData = {
            subjectName: formData.subjectName,
            subjectCode: formData.subjectCode,
          };
          break;
        case "Department":
          updatedData = {
            departmentName: formData.departmentName,
            departmentCode: formData.departmentCode,
          };
          break;
        case "Course":
          updatedData = {
            courseName: formData.courseName,
            courseCode: formData.courseCode,
          };
          break;
        default:
          return;
      }

      dispatch(updateVertical({ token, id, body: updatedData, type }))
        .unwrap()
        .then(() => {
          handleReset();
          fetchVerticals();
          onClose();
          toast.success(`${type} updated successfully.`);
        })
        .catch((error) => {
          console.error(`Failed to update: ${type}.`, error);
          toast.error(`Failed to update: ${type}.`);
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
          Edit {type}
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
                onClick={() => handleSubmit(initialData.id)}
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
