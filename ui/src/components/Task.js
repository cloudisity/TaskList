// src/components/Task.js
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    Checkbox,
    Box,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import React, { useState } from "react";
  import { UpdateTaskForm } from "./UpdateTaskForm";
  import axios from "axios";
  import { API_URL } from "../utils";
  import { styled } from "@mui/material/styles";
  
  // StyledCard with conditional background based on completion
  const StyledCard = styled(Card)(({ theme, completed }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: completed ? theme.palette.action.hover : theme.palette.background.paper,
  }));
  
  export const Task = ({ task, fetchTasks }) => {
    const { id, name, completed } = task;
    const [isComplete, setIsComplete] = useState(completed);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    // Handle task completion toggle
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
  
    // Handle task deletion
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
          <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={isComplete}
                onChange={handleUpdateTaskCompletion}
                color="primary"
                inputProps={{ "aria-label": `Mark ${name} as ${isComplete ? "incomplete" : "complete"}` }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  flexGrow: 1,
                  textDecoration: isComplete ? "line-through" : "none",
                  color: isComplete ? "text.secondary" : "text.primary",
                }}
              >
                {name}
              </Typography>
              <Tooltip title="Edit Task">
                <IconButton
                  color="primary"
                  onClick={() => setIsDialogOpen(true)}
                  aria-label={`edit task ${name}`}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton
                  color="error"
                  onClick={handleDeleteTask}
                  aria-label={`delete task ${name}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </StyledCard>
        {/* Update Task Dialog */}
        <UpdateTaskForm
          fetchTasks={fetchTasks}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          task={task}
        />
      </>
    );
  };
  