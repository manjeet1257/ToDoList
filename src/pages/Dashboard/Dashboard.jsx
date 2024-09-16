import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Grid container spacing={2} alignItems={"stretch"} height={"100vh"}>
      <Grid size={2} sx={{ background: "#f5f5f5" }}>
        <Typography variant="subtitle1">
          <strong>Menu</strong>
        </Typography>
      </Grid>
      <Grid size={6}>2</Grid>
      <Grid size={4} sx={{ background: "#f5f5f5" }}>
        3
      </Grid>
    </Grid>
  );
}
