// src/App.js
import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon Icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun Icon
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState(() => {
    // Retrieve the theme mode from localStorage if available
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "dark";
  });

  // Define the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", newMode); // Persist theme preference
      return newMode;
    });
  };

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          mt: { xs: 2, sm: 4 },
          mb: { xs: 2, sm: 4 },
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Header Section with Title and Theme Toggle Switch */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">My Task List</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === "dark"}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label={mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
              labelPlacement="start"
              sx={{ m: 0 }}
            />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          {/* Add Task Form */}
          <AddTaskForm fetchTasks={fetchTasks} />
          {/* Task List */}
          <Box sx={{ mt: 4 }}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task key={task.id} task={task} fetchTasks={fetchTasks} />
              ))
            ) : (
              <Typography align="center" color="textSecondary">
                No tasks available. Add a new task!
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
