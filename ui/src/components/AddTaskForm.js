import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = () => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async (fetchTasks) => {
    try{
      await axios.post(API_URl, {
        name: newTask,
        completed: false,
      });

      await fetchTasks();

      seetNewTask("");
    }catch(err){
      console.error(err);
    }
  };
  return (
    <div className="addTaskForm">
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        My Task List
      </Typography>
      <div>
      <TextField
        size="small"
        label="Task"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button disabled = {!newTask.length} variant="outlined" onClick={addNewTask}>
        <AddIcon />
      </Button>
      </div>
    </div>
  );
};
