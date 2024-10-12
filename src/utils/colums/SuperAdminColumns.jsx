import RenderButtons from "../../components/buttons/RenderButton";
import { renderAvatar, renderStatus } from "../functions";

export const superAdminColumns = (
  handleEdit,
  handleDelete,
  handlePasswordReset,
  handleActivate,
  handleInfo,
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
      const { status } = params.row;
      // Logic to determine which buttons to show for Deleted users
      if (status === "Deleted") {
        return (
          <RenderButtons
            params={params}
            handleActivate={
              userRole === "SuperAdmin" ? handleActivate : undefined
            }
          />
        );
      }
      return (
        <RenderButtons
          params={params}
          handleEdit={userRole === "SuperAdmin" ? handleEdit : undefined}
          handleDelete={userRole === "SuperAdmin" ? handleDelete : undefined}
          handlePasswordReset={
            userRole === "SuperAdmin" ? handlePasswordReset : undefined
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
      field: "email",
      headerName: "Email",
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
    userRole === "SuperAdmin" && actionsColumn,
  ];
};
