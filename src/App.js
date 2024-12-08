// src/App.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MealList from "./components/MealList";

const App = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Marrfa Assignment</Typography>
        </Toolbar>
      </AppBar>
      <MealList />
    </div>
  );
};

export default App;
