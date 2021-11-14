import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Card from "./components/Card";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetch("http://192.168.29.200:5000/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    } else {
      setLoggedIn(false);
    }
  }, [loading]);
  const Login = () => {
    setLoading(true);
    setIsDisabled(true);
    const name = window.prompt("Enter your name");
    const password = window.prompt("Enter your password");
    fetch("http://192.168.29.200:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message === "Login Successful") {
          localStorage.setItem("token", data["token"]);
          setLoggedIn(true);
          setLoading(false);
          setIsDisabled(false);
        } else {
          if (window.confirm(data.message, "Try Again ?")) {
            Login();
          }
        }
      });
  };
  const Register = () => {
    setLoading(true);
    setIsDisabled(true);
    const name = window.prompt("Enter your name");
    const password = window.prompt("Enter your password");
    fetch("http://192.168.29.200:5000/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        isAdmin: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data["token"]);
        localStorage.setItem("token", data["token"]);
      });
    setLoading(false);
    setIsDisabled(false);
  };

  const Logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <BrowserRouter>
        <Route exact path="/">
          <h1 class="text-3xl text-center md:text-4xl font-heading font-bold m-2 text-indigo-500">
            To Do App using React as a FrontEnd and Flask API as a Backend
          </h1>{" "}
          <div className="flex flex-row items-center justify-center">
            {!loggedIn && (
              <>
                <button
                  className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={Login}
                  disabled={isDisabled}
                >
                  {!loading ? "Login" : "loading..."}
                </button>
                <button
                  className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={Register}
                  disabled={isDisabled}
                >
                  {!loading ? "Register" : "loading..."}
                </button>
              </>
            )}
            {loggedIn && (
              <>
                <button
                  className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={Logout}
                >
                  {!loading ? "Logout" : "loading..."}
                </button>
              </>
            )}
          </div>
          {loggedIn && (
            <>
              {" "}
              <Input />
              <Card />
            </>
          )}
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
