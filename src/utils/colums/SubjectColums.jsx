import RenderButtons from "../../components/buttons/RenderButton";
import { renderAvatar, renderStatus } from "../functions";

export const subjectColumns = (
  handleEdit,
  handleDelete,
  handleActivate,
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
      minWidth: 100,
      renderCell: (params) => renderAvatar(params),
    },
    userRole === "SuperAdmin" && {
      field: "id",
      headerName: "Identity",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "name",
      headerName: "Subject Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "code",
      headerName: "Subject Code",
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
    userRole === "SuperAdmin" && actionsColumn,
  ].filter(Boolean); // Filters out undefined columns
};
