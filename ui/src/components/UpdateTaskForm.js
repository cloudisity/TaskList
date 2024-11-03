// src/components/UpdateTaskForm.js
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateTaskForm = ({
  fetchTasks,
  isDialogOpen,
  setIsDialogOpen,
  task,
}) => {
  const { id, name, completed } = task;
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDialogOpen) {
      setTaskName(name);
      setError("");
    }
  }, [isDialogOpen, name]);

  const handleUpdateTaskName = async () => {
    if (taskName.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }
    try {
      await axios.put(API_URL, {
        id,
        name: taskName,
        completed,
      });

      await fetchTasks();

      setTaskName("");
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleUpdateTaskName();
          }}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={handleUpdateTaskName}
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
          >
            Save
          </Button>
          <Button
            onClick={() => setIsDialogOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
