import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const NoDataFound = ({ message }) => {
  return (
    <Card sx={{ textAlign: "center", p: 2, margin: "auto" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoDataFound;
