import React, { useEffect, useState } from "react";
import ErrorAlert from "./Alerts/ErrorAlert";
import SuccessAlert from "./Alerts/SuccessAlert";

const TaskCard = () => {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    fetch(`http://192.168.29.200:5000/task/${id}`)
      .then((res) => res.json())
      .then((data) => setProps(data));
  }, [success]);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  const requestOptions2 = {
    method: "DELETE",
  };
  const [props, setProps] = useState([]);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://192.168.29.200:5000/task/${props.id}`, {
      method: "PUT",
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
          setEdit(false);

          setErrorMessage(data.message);
        } else {
          setError(false);
          setSuccess(true);
          setIsLoading(false);
          setSuccessMessage("Task Modified successfully");
          setEdit(false);
          setDetails("");
        }
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
        setEdit(false);

        setErrorMessage(err.message);
      });
  };

  const deleteStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://192.168.29.200:5000/task/${props.id}`, requestOptions2)
      .then((response) => response.json())
      .then((data) => setSuccessMessage(data.message))
      .then(() => {
        setError(false);
        setSuccess(true);
        setIsLoading(false);
        setEdit(false);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
        setEdit(false);
        setErrorMessage(err.message);
      });
  };

  const updateStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://192.168.29.200:5000/task/update/${props.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSuccessMessage(data.message))
      .then(() => {
        setError(false);
        setSuccess(true);
        setIsLoading(false);
        setEdit(false);
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
        setIsLoading(false);
        setEdit(false);
        setErrorMessage(err.message);
      });
  };

  return (
    <>
      {success && <SuccessAlert success={successMessage} />}
      {error && <ErrorAlert error={errorMessage} />}
      <div className="flex flex-row items-center justify-center w-full lg:w-1/2 h-1/2">
        <div className="bg-white p-5 m-5 h-full w-full shadow-md rounded-lg">
          {props.message && (
            <>
              <h1 className="text-center text-2xl font-bold">
                {props.message}
              </h1>
            </>
          )}
          {props.status == 1 && (
            <>
              <h1 className="text-xl lg:text-3xl ml-2 font-semibold text-green-400 group-hover:text-gray-500 active:text-green-400">
                🦄 {props.title}
              </h1>
              <p className="text-xl font-thin p-2">
                <b>Task Details: </b>
                {props.description}
              </p>
              <p className="text-xl font-thin p-2">
                Last Modified On: {props.updated_at}
              </p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={deleteStatus}
              >
                Delete
              </button>
            </>
          )}
          {props.status != 1 && (
            <>
              <h1 className="text-xl lg:text-3xl ml-2 font-semibold text-red-400 group-hover:text-gray-500 focus:text-green-400">
                🦄 {props.title}
              </h1>
              <p className="text-xl font-thin p-2">
                <b>Task Details: </b>
                {props.description}
              </p>{" "}
              <p className="text-xl font-thin p-2">
                Created On: {props.created_at}
              </p>
              {!edit && (
                <>
                  <button
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={updateStatus}
                  >
                    ✅ Done
                  </button>
                </>
              )}
              {edit && (
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              )}
              {edit && (
                <>
                  <form
                    className="flex flex-col justify-evenly"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <textarea
                        className="bg-blue-100 px-10 py-10 text-gray-800 leading-tight focus:outline-none font-semibold h-full w-full"
                        type="text"
                        placeholder={props.description}
                        height="100%"
                        onChange={(e) => setDetails(e.target.value)}
                        width="100%"
                        required
                      />
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      {!isLoading ? "✅ Modify Task" : "loading..."}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default TaskCard;
