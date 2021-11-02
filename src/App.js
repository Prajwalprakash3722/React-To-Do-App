import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Card from "./components/Card";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <BrowserRouter>
        <Route exact path="/">
          <h1 class="text-3xl text-center md:text-4xl font-heading font-bold m-2 text-indigo-500">
            To Do App using React as a FrontEnd and Flask API as a Backend
          </h1>{" "}
          <Input />
          <Card />
        </Route>
        <Route path="/view">
          <TaskCard />
        </Route>
        <h1 class="text-md font-heading m-2 text-white">
          Coded with ❤️ by Prajwal
        </h1>{" "}
      </BrowserRouter>
    </div>
  );
}

export default App;
