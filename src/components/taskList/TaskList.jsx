import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { TodoContext } from "../../pages/Dashboard/Dashboard";

export default function TaskList() {
  const { taskList, onToggle } = useContext(TodoContext);
  return (
    <>
      {taskList.map(({ id, title, isCompleted }, index) => {
        return (
          <Box key={`div_${id}`}>
            <FormControlLabel
              control={
                <Checkbox
                  key={`Chk_${id}`}
                  size="small"
                  checked={isCompleted}
                  onChange={() => onToggle(id, isCompleted)}
                />
              }
              label={title}
            />
          </Box>
        );
      })}
    </>
  );
}
