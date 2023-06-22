import { BsPlusLg } from "react-icons/bs";
import Task from "./Task";
import { useState, useEffect } from "react";
import "../styles/ToDoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateData, fetchDataRealtime } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";

const ToDoList = () => {
  const [user] = useAuthState(auth);

  // membuat state tasks
  const [tasks, setTasks] = useState([]);

  // 0 : {checked: false, task: 'ngoding'}

  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/tasks`, (snapshot) => {
      setTasks(Object.values(snapshot));
    });
  }, [user.uid]);

  const [inputValue, setInputValue] = useState("");

  const getInputValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="regular-size shadow">
      <div className="regular-size p-3">
        <div className="rounded-3 border border-2 border-black bg-white-dark content-1 p-3 position-relative">
          <div className="d-flex">
            <h1 className="fw-bold ms-2">To Do List</h1>
          </div>
          <div className="container">
            {tasks.length !== 0 ? (
              tasks.map((_, index) => (
                <Task
                  tasks={tasks}
                  index={index}
                  user={user}
                  key={index}
                  setTasks={setTasks}
                />
              ))
            ) : (
              <div>Tidak ada task</div>
            )}
          </div>
          <div className="new-task-container d-flex justify-content-evenly align-items-center">
            <input
              type="text"
              className="form-control input-task"
              placeholder="New Task"
              onChange={getInputValue}
              value={inputValue}
            />
            <button
              className="icon icon-plus-todolist"
              onClick={() => {
                // ubah isi tasks di database
                updateData(`users/${user.uid}/tasks`, [
                  ...tasks,
                  { task: inputValue, checked: false },
                ]);
                // kosongkan value state inputValue
                setInputValue("");
              }}
            >
              <BsPlusLg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
