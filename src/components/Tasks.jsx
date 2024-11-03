import React, { useEffect, useState } from "react";
import Axios from "axios";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Axios.get("http://localhost:5000/getTasks").then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log("Error in geting data from database", error);
    }
  };

  const editTask = async (id) => {
    try {
      const res = await Axios.put(`http://localhost:5000/update/${id}`);
      console.log("Task updated:", res.data);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, ...res.data } : item
        )
      );
      fetchData();
      //   location.reload();
    } catch (error) {
      console.log("Error in updating task:", error);
    }
  };

  const addTask = async () => {
    try {
      await Axios.post("http://localhost:5000/add", {
        task: todo,
        done: false,
      }).then((res) => {
        // alert("Todo Added successfully");
        setTodo("");
        fetchData();
      });
    } catch (error) {
      console.log("Error in geting data from database", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
        // alert("Task deleted successfully");
        fetchData();
      });
    } catch (error) {
      console.log("Error in deleting", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Task Manager
          </h1>

          <div className="mt-6 flex">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a new task..."
              className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition duration-300"
            >
              Add
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {data.length === 0 ? (
              <h4 className="text-xl font-bold text-center text-gray-700">
                No Task Added
              </h4>
            ) : (
              Array.isArray(data) &&
              data.map((item, index) => (
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
                      onChange={() => editTask(item._id)}
                      className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
                    />
                    <span>{item.task}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(item._id)}
                    className="text-red-500 hover:text-red-600 transition duration-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tasks;
