// src/components/UpdateTaskForm.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
      setSnackbarMessage("Task updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
      setSnackbarMessage("Failed to update task.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
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
      {/* Snackbar for user feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
