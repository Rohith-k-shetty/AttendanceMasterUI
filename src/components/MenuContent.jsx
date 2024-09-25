import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const menuItems = [
  {
    text: "Home",
    icon: <HomeRoundedIcon />,
    path: "/", // Route for Home
    children: [], // No children for Home
  },
  {
    text: "Users",
    icon: <PeopleRoundedIcon />,
    path: null, // No route for parent "Users"
    children: [
      {
        text: "Super Admin",
        icon: <PeopleRoundedIcon />,
        path: "/users/super-admin",
      },

      { text: "Admin", icon: <PeopleRoundedIcon />, path: "/users/admins" },
      {
        text: "Teacher",
        icon: <AssignmentRoundedIcon />,
        path: "/users/teacher",
      },
      {
        text: "Student",
        icon: <AssignmentRoundedIcon />,
        path: "/users/student",
      },
    ],
  },
  {
    text: "Attendance Book",
    icon: <AssignmentRoundedIcon />,
    path: null, // No route for parent "Attendance Book"
    children: [
      {
        text: "View",
        icon: <AssignmentRoundedIcon />,
        path: "/attendance-book/view",
      },
      {
        text: "Add",
        icon: <AssignmentRoundedIcon />,
        path: "/attendance-book/add",
      },
    ],
  },
];

export default function MenuContent() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleParentClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: "block" }}>
              {/* Check if it's a parent with children or a direct route */}
              <ListItemButton
                component={item.path ? Link : undefined} // Only apply Link for items with paths
                to={item.path} // Navigate to the path if available
                onClick={() =>
                  item.children.length > 0 && handleParentClick(index)
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.children.length > 0 ? (
                  openIndex === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>

            {item.children.length > 0 && (
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => (
                    <ListItem key={childIndex} sx={{ pl: 2 }} disablePadding>
                      <ListItemButton component={Link} to={child.path}>
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
