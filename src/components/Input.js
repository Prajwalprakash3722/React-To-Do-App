import React, { useState } from "react";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";
const Input = () => {
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    fetch("http://192.168.29.200:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: details.slice(0, 10),
        description: details,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.error) {
          setError(true);
          setSuccess(false);
          setIsLoading(false);
          setIsDisabled(false);
          setErrorMessage(data.message);
        } else {
          setError(false);
          setSuccess(true);
          setIsLoading(false);
          setIsDisabled(false);
          setSuccessMessage("Task added successfully");
          setDetails("");
        }
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
        setIsDisabled(false);
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      {success && <SuccessAlert success={successMessage} />}
      {error && <ErrorAlert error={errorMessage} />}
      <div className="w-full h-full m-5 lg:w-1/2">
        <div className=" bg-blue-100 m-5 rounded-md flex flex-row justify-around items-center p-2">
          {" "}
          <h1 className="text-2xl text-blue-600 font-extrabold">Add Task:</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
              <textarea
                className="resize overflow-hidden bg-blue-100 px-2 py-2 text-gray-800 leading-tight focus:outline-none font-heading"
                type="text"
                placeholder="Task Details"
                rows="4"
                cols="10"
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <button
              className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {!isLoading ? "✅ Add" : "loading..."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Input;
