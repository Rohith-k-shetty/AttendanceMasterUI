import { Avatar, Box, Chip } from "@mui/material";

export function renderStatus(status) {
  const colors = {
    Active: "success",
    Inactive: "default",
  };
  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }} // Ensure vertical centering
    >
      <Avatar
        sx={{
          backgroundColor: params.value.color,
          width: "32px",
          height: "32px",
          fontSize: "0.85rem",
        }}
      >
        {params.value.name.toUpperCase().substring(0, 1)}
      </Avatar>
    </Box>
  );
}

export const mapStudentsToFields = (studentArray) => {
  return studentArray.map((student) => ({
    id: student.id,
    avatar: {
      name: student.name,
      color:
        student.gender == "Male"
          ? "#3f51b5"
          : student.gender == "Female"
          ? "#f50057"
          : "#f50057",
    },
    username: student.username,
    name: student.name,
    course: student.course ? student.course.courseCode : "",
    year: student.year ? student.year.year : "",
    gender: student.gender || "N/A",
    status: student.status,
    phone: student.phoneNo || "N/A",
  }));
};

export const mapTeachersToFields = (teacherArray) => {
  return teacherArray.map((teacher) => ({
    id: teacher.id,
    avatar: {
      name: teacher.name,
      color:
        teacher.gender == "Male"
          ? "#3f51b5"
          : teacher.gender == "Female"
          ? "#f50057"
          : "#f50057",
    },
    username: teacher.username,
    name: teacher.name,
    department: teacher.department ? teacher.department.departmentCode : "",
    email: teacher.email ? teacher.email : "",
    gender: teacher.gender || "N/A",
    status: teacher.status,
    phone: teacher.phoneNo || "N/A",
  }));
};
