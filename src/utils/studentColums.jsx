import RenderButtons from "../components/buttons/RenderButton";
import { renderAvatar, renderStatus } from "./functions";

export const studentColumns = (
  handleEdit,
  handleDelete,
  handlePasswordReset,
  handleActivate,
  handleInfo, // added handleInfo
  userRole
) => {
  const actionsColumn = {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const { status } = params.row; // Extracting the user's status

      // Logic to determine which buttons to show for Deleted users
      if (status === "Deleted") {
        return (
          <RenderButtons
            params={params}
            handleActivate={
              userRole === "SuperAdmin" ? handleActivate : undefined
            }
            handleInfo={userRole !== "SuperAdmin" ? handleInfo : undefined}
          />
        );
      }

      // Show all buttons for non-deleted users
      return (
        <RenderButtons
          params={params}
          handleEdit={
            userRole === "SuperAdmin" ||
            userRole === "Admin" ||
            userRole === "Teacher"
              ? handleEdit
              : undefined
          }
          handleDelete={userRole === "SuperAdmin" ? handleDelete : undefined}
          handlePasswordReset={
            userRole === "SuperAdmin" || userRole === "Admin"
              ? handlePasswordReset
              : undefined
          }
        />
      );
    },
  };

  return [
    {
      field: "avatar",
      headerName: "Avatar",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderAvatar(params),
    },
    {
      field: "username",
      headerName: "Username",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "course",
      headerName: "Course",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "year",
      headerName: "Year",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => renderStatus(params.value),
    },
    {
      field: "phone",
      headerName: "Phone",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
    userRole !== "Student" && actionsColumn, // Only add the actions column if the role is not "Student"
  ];
};
