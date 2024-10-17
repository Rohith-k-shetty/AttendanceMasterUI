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
import { useDispatch, useSelector } from "react-redux";
import SubjectIcon from "@mui/icons-material/Subject";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import toast from "react-hot-toast";
import {
  resetModifyVerticalState,
  saveVertical,
} from "../../features/vertical/modifyVerticalSlice";
import {
  selectModifyVerticalError,
  selectModifyVerticalLoading,
} from "../../features/vertical/modifyVerticalSelectors";

export default function AddVerticalDrawer({
  open,
  onClose,
  type,
  token,
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

  const handleSubmit = () => {
    if (validateForm()) {
      let newformdata;
      switch (type) {
        case "Subject":
          newformdata = {
            subjectName: formData.subjectName,
            subjectCode: formData.subjectCode,
          };
          break;
        case "Department":
          newformdata = {
            departmentName: formData.departmentName,
            departmentCode: formData.departmentCode,
          };
          break;
        case "Course":
          newformdata = {
            courseName: formData.departmentName,
            courseCode: formData.departmentCode,
          };
          break;
        default:
          return;
      }

      dispatch(saveVertical({ token, body: newformdata, type }))
        .unwrap()
        .then(() => {
          handleReset();
          fetchVerticals();
          onClose();
          toast.success(`${type} added successfully.`);
        })
        .catch((error) => {
          console.error(`Failed to save: ${type}.`, error);
          toast.error(`Failed to save: ${type}.`);
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
          Add New {type}
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
    </Drawer>
  );
}
