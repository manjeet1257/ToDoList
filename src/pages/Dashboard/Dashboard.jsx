import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState, useRef, createContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addTodo,
  editTodo,
  getTodo,
  toggleTodo,
  removeTodo,
} from "../../redux/actions/todoAction";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import TaskList from "../../components/taskList";

export const TodoContext = createContext({});

export default function Dashboard() {
  const today = new Date();
  const tomorrowDate = `${String(today.getFullYear())}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate() + 1).padStart(2, "0")}`;
  const [form, setForm] = useState({
    id: -1,
    task: "",
    desc: "",
    duedate: tomorrowDate,
    isCompleted: false,
  });
  const [selectedTask, setSelectedTask] = useState(null); // New state to hold the selected task for editing
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const taskList = useSelector((state) => {
    // console.log(state);
    return state.toDos.tasks;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    dispatch(getTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleTaskClick = (id) => {
    setForm({ id: -1, task: "", desc: "", isCompleted: false });
    const taskToEdit = taskList.find((task) => task.id === id);
    // console.log(taskToEdit.dueDate);
    setForm({
      id: taskToEdit.id,
      task: taskToEdit.title,
      desc: taskToEdit.description || "",
      duedate: taskToEdit.dueDate,
      isCompleted: taskToEdit.isCompleted,
    });
    setSelectedTask(taskToEdit); // Set the selected task for edit mode
  };

  const handleDateChange = (newDate) => {
    setForm({
      ...form,
      duedate: dayjs(newDate).format("YYYY-MM-DD"),
    });
  };

  const handleChange = (event) => {
    // console.log(event.target);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTodo(selectedTask.id));
  };

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
    const { id, task, desc, duedate, isCompleted } = form;
    // if (selectedTask) {
    //   console.log("handleSubmitTask edit: " + setSelectedTask);
    //   dispatch(editTodo(id, task, desc));
    // } else {
    //   console.log("handleSubmitTask add");
    //   dispatch(addTodo(task, desc));
    // }
    // console.log("handleSubmitTask" + setSelectedTask);
    selectedTask
      ? dispatch(editTodo(id, task, desc, duedate, isCompleted))
      : dispatch(addTodo(task, desc, duedate));
  };

  const handleAddTask = () => {
    const today = new Date();
    const tomorrowDate = `${String(today.getFullYear())}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate() + 1).padStart(2, "0")}`;

    setForm({ id: -1, task: "", desc: "", duedate: tomorrowDate });
    setSelectedTask(null);
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
          onClick={handleAddTask}
          sx={{ width: "80px", justifyContent: "left", paddingLeft: 0 }}
        >
          Add Task
        </Button>
        <TodoContext.Provider
          value={{
            taskList,
            onToggle: handleCompleteTodo,
            onEdit: handleTaskClick,
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
            name="task"
            value={form.task}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="desc"
            label="Description"
            variant="outlined"
            multiline
            rows={2}
            name="desc"
            size="small"
            value={form.desc}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dayjs(form.duedate)}
              format="DD/MM/YYYY"
              name="duedate"
              onChange={(newValue) => handleDateChange(newValue)}
            />
          </LocalizationProvider>
          <Box
            sx={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmitTask}
              size="small"
              sx={{ marginRight: "10px" }}
            >
              {selectedTask ? "Save Changes" : "Add Task"}
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={() => handleDeleteTask()}
            >
              Delete Task
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
