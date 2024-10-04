import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const getColumns = (handleEdit, handleDelete) => [
  // {
  //   field: "photo",
  //   headerName: "Photo",
  //   width: 100,
  //   renderCell: (params) => <Avatar alt="User Photo" />, // Placeholder Avatar
  // },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => handleEdit(params.id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];
