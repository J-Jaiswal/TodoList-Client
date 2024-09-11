import React, { useEffect, useState } from "react";
import Axios from "axios";

const Tasks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get("http://localhost:5000/getTasks").then((res) => {
          setData(res.data);
        });
      } catch (error) {
        console.log("Error in geting data from database", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Todo List
          </h1>

          <div className="mt-6 flex">
            <input
              type="text"
              // value={task}
              // onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task..."
              className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none"
            />
            <button
              // onClick={addTask}
              className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition duration-300"
            >
              Add
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {data.map((item, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg bg-gray-50 shadow-md `}
              >
                <div
                  className={`flex items-center space-x-3 ${
                    item.done ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    // onChange={() => toggleTask(index)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span>{item.task}</span>
                </div>
                <button
                  // onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tasks;
