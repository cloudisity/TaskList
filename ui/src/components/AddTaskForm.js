// src/components/AddTaskForm.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography, Stack, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const addNewTask = async () => {
    if (newTask.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }
    try {
      await axios.post(API_URL, {
        name: newTask,
        completed: false,
      });

      await fetchTasks();

      setNewTask("");
      setError("");
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          fullWidth
          size="small"
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") addNewTask();
          }}
          error={Boolean(error)}
          helperText={error}
        />
        <Tooltip title="Add Task">
          <span>
            {/* Span is needed to handle disabled tooltip */}
            <Button
              disabled={!newTask.trim().length}
              variant="contained"
              color="primary"
              onClick={addNewTask}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </div>
  );
};
