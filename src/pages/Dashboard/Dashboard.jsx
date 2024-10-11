import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState, useRef, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo, getTodo, toggleTodo } from "../../redux/actions/todoAction";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TaskList from "../../components/taskList";

export const TodoContext = createContext({});

export default function Dashboard() {
  const [type, setType] = useState("today");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskRef = useRef();
  const descRef = useRef();
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

  const handleSubmitTask = () => {
    const task = taskRef.current.value;
    const desc = descRef.current.value;
    dispatch(addTodo(task, desc));
  };

  return (
    <Grid container spacing={2} alignItems={"stretch"}>
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
        <Button
          variant="text"
          fullWidth
          onClick={handleSubmitTask}
          sx={{ width: "80px", justifyContent: "left", paddingLeft: 0 }}
        >
          Add Task
        </Button>
        <TodoContext.Provider
          value={{
            taskList,
            onToggle: handleCompleteTodo,
          }}
        >
          <TaskList />
        </TodoContext.Provider>
      </Grid>
      <Grid size={4} sx={{ background: "#f5f5f5", p: "2px" }}>
        <Box sx={{ width: "50px", marginBottom: "20px" }}>
          <Typography variant="h6">Task</Typography>
        </Box>
        <Box
          gap="15px"
          height="100vh"
          flexDirection="column"
          display="flex"
          sx={{ margin: "auto" }}
          width="300px"
        >
          <TextField
            size="small"
            fullWidth
            id="task"
            label="Task"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            size="small"
          />
          <Box
            sx={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmitTask}
              size="small"
              sx={{ width: "250px", marginRight: "10px" }}
            >
              Save Changes
            </Button>
            <Button variant="contained" fullWidth size="small">
              Delete Task
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
