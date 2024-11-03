// src/components/Task.js
import { Checkbox, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import { API_URL } from "../utils";
import axios from "axios";

export const Task = ({ task, onDelete, onUpdate, fetchTasks }) => {
  const { id, taskName, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id, name, completed: !isComplete,
      }
        );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async() => {
    try{
      await axios.delete(`${API_URL}/$task.id}`);

      await fetchTasks();
    } catch(err){
      console.error(err);
    }
  };

  const handleUpdateTaskName = (updatedTaskName) => {
    onUpdate(id, { ...task, taskName: updatedTaskName });
  };

  return (
    <div className="task">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4"> {taskName}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
        onUpdateTaskName={handleUpdateTaskName}
      />
    </div>
  );
};
