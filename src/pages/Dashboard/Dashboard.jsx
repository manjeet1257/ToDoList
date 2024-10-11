import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodo, toggleTodo } from "../../redux/actions/todoAction";

export default function Dashboard() {
  const [type, setType] = useState("today");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskList = useSelector((state) => {
    // console.log(state);
    return state.toDos.tasks;
  });

  useEffect(() => {
    // console.log("useeffect");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    dispatch(getTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleCompleteTodo = (id, isCompleted) => {
    dispatch(toggleTodo(id, !isCompleted));

    // const token = localStorage.getItem("token");
    // let isCompleted;
    // const tasks = taskList.map((task) => {
    //   if (id === task.id) {
    //     task.isCompleted = !task.isCompleted;
    //     isCompleted = task.isCompleted;
    //   }
    //   return task;
    // });
    // fetch(`http://localhost:5000/api/Task/UpdateTask/${id}`, {
    //   method: "patch",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify([
    //     {
    //       op: "replace",
    //       path: "/isCompleted",
    //       value: isCompleted,
    //     },
    //   ]),
    // })
    //   .then((res) => {
    //     if (!res.ok && res.status === 401) {
    //       localStorage.removeItem("token");
    //       console.error("Unauthorized access. Please log in again.");
    //       navigate("/login");
    //     }
    //     return res.json();
    //   })
    //   .then(() => {
    //     // setTaskList([...tasks]);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

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
        </h6>
      </Grid>
      <Grid size={6}>
        {taskList.map(({ title, isCompleted }, index) => {
          return (
            <p key={`p-${index + 1}`}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => handleCompleteTodo(index + 1, isCompleted)}
              ></input>
              {title}
            </p>
          );
        })}
      </Grid>
      <Grid size={4} sx={{ background: "#f5f5f5" }}>
        3
      </Grid>
    </Grid>
  );
}
