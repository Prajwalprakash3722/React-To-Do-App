import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [TableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("http://192.168.29.200:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTableData(data));
    console.log(TableData);
  }, []);
  return (
    <div className="mb-10">
      {TableData.length > 0 && (
        <table class="shadow-lg bg-white">
          <tr>
            <th class="bg-blue-100 border text-center px-8 py-4">Public Id</th>
            <th class="bg-blue-100 border text-center px-8 py-4">Name</th>
          </tr>
          {TableData.length > 0 &&
            TableData.map((data) => (
              <tr className="group">
                <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                  {" "}
                  {data.public_id}
                </td>
                <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                  {data.name}
                </td>
              </tr>
            ))}
        </table>
      )}
    </div>
  );
};

export default Users;
