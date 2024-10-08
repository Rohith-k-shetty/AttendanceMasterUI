import RenderButtons from "../components/buttons/RenderButton";
import { renderAvatar, renderStatus } from "./functions";

export const studentColumns = (
  handleEdit,
  handleDelete,
  handlePasswordReset
) => [
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
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <RenderButtons
        params={params} // Pass params correctly
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handlePasswordReset={handlePasswordReset}
      />
    ),
  },
];
