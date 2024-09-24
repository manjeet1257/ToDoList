import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [type, setType] = useState("today");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    console.log("experiment");
    const token = localStorage.getItem("token");
    const url = `http://localhost:5000/api/Task/GetAllTask?type=${type}`;
    fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("experiment" + data);
        setTaskList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Grid container spacing={2} alignItems={"stretch"} height={"100vh"}>
      <Grid size={2} sx={{ background: "#f5f5f5" }}>
        <h3>
          <span>Menu</span>
        </h3>
        <h6>
          <span>Upcoming</span>
          <br />
          <span>Today</span>
          <br />
          <span>Calender</span>
          <br />
        </h6>
      </Grid>
      <Grid size={6}>
        {taskList.map(({ title, iscomplete }, index) => {
          return <p>{title}</p>;
        })}
      </Grid>
      <Grid size={4} sx={{ background: "#f5f5f5" }}>
        3
      </Grid>
    </Grid>
  );
}
