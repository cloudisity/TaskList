// src/components/Task.js
import { Button, Checkbox, Typography, Card, CardContent, CardActions, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import axios from "axios";
import { API_URL } from "../utils";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, completed }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: completed ? theme.palette.action.hover : theme.palette.background.paper,
}));

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      <StyledCard completed={isComplete ? 1 : 0}>
        <CardContent>
          <Checkbox
            checked={isComplete}
            onChange={handleUpdateTaskCompletion}
            color="primary"
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              textDecoration: isComplete ? "line-through" : "none",
              color: isComplete ? "text.secondary" : "text.primary",
            }}
          >
            {name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Edit Task">
            <IconButton
              color="primary"
              onClick={() => setIsDialogOpen(true)}
              aria-label="edit task"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task">
            <IconButton
              color="error"
              onClick={handleDeleteTask}
              aria-label="delete task"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </StyledCard>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </>
  );
};
