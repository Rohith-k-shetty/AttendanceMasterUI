import { Card, CardContent, Grid, Typography, Button } from "@mui/material";

export function TittleCard({ tittle, buttonAction, button }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">{tittle}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                buttonAction();
              }}
            >
              {button}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
