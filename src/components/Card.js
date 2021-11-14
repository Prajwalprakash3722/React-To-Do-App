import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";

const Card = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [task, setTask] = useState("");
  const [props, setProps] = useState([]);
  useEffect(() => {
    fetch("http://192.168.29.200:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setProps(data))
      .then((data) => {
        setSuccess(true);
        setIsLoading(false);
        setSuccessMessage("Successfully Fetched Data");
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        setErrorMessage(err.message);
      })
      .then((data) =>
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 3000)
      );
  }, []);
  return (
    <>
      {success && (
        <div className="flex flex-row">
          <SuccessAlert success={successMessage} />
        </div>
      )}
      {error && (
        <div className="flex flex-row">
          <ErrorAlert error={errorMessage} />
        </div>
      )}
      {!showAll && (
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => setShowAll(true)}
        >
          Show Completed
        </button>
      )}
      {showAll && (
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => setShowAll(false)}
        >
          Hide Completed
        </button>
      )}
      {props.length > 0 &&
        props.map((props) => {
          return (
            <div className="group w-full lg:w-1/3" key={props.id}>
              <div className=" bg-gray-50 p-5 m-5 transition duration-500 transform hover:scale-125 flex flex-row justify-between">
                {" "}
                <div>
                  {showAll == 1 && props.status == 1 && (
                    <>
                      <Link to={`view/?id=${props.id}`}>
                        <h1 className="text-xl lg:text-3xl ml-2 font-semibold text-green-400 group-hover:text-gray-500 active:text-green-400 line-through	">
                          🦄 {props.title}
                        </h1>
                      </Link>
                      <p className="text-xl font-thin p-2">Task Done</p>
                      <p className="text-xl font-thin p-2">
                        Last Modified On: {props.updated_at}
                      </p>
                    </>
                  )}
                  {props.status != 1 && (
                    <>
                      <Link to={`view/?id=${props.id}`}>
                        <h1 className="text-xl lg:text-3xl ml-2 font-semibold text-red-400 group-hover:text-gray-500 focus:text-green-400">
                          🦄 {props.title}
                        </h1>
                      </Link>
                      <p className="text-xl font-thin p-2">
                        {props.description.slice(0, 40)}....
                      </p>
                      <p className="text-xl font-thin p-2">
                        Created On: {props.created_at}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  {props.status == 1 ? (
                    <>
                      <Link to={`view/?id=${props.id}`}>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          {!isLoading ? "👀" : "loading..."}
                        </button>
                      </Link>
                    </>
                  ) : (
                    <Link to={`view/?id=${props.id}`}>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        {!isLoading ? "👀" : "loading..."}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex flex-row">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default Card;
