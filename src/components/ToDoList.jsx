import { signOut, getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { BsPlusLg } from "react-icons/bs";
import Task from "./Task";
import { useState, useEffect } from "react";
import "../styles/ToDoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";

// realtime databe
const DataRealtime = (path, callback) => {
  const transferData = (snapshot) => {
    callback(snapshot);
  };
  const dbRef = ref(getDatabase(), path);
  onValue(dbRef, (snapshot) => {
    if (snapshot.val() !== null) {
      let result = Object.entries(snapshot.val()).map((e) => {
        return e[1];
      });
      transferData(result);
    }
  });
};

const ToDoList = () => {
  const [user] = useAuthState(auth);

  // membuat state tasks
  const [tasks, setTasks] = useState([]);

  // console.log(tasks);
  // 0 : {checked: false, task: 'ngoding'}
  // 1 : {checked: false, task: 'turu'}
  // 2 : {checked: false, task: 'asas'}
  // 3 : {checked: true, task: 'halo'}
  // 4 : {checked: false, task: 'hai'}

  useEffect(() => {
    DataRealtime(`users/${user.uid}/tasks`, (snapshot) => {
      setTasks(snapshot);
    });
  }, []);
  // console.log(tasks);

  const [inputValue, setInputValue] = useState("");

  const getInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const signOutClick = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Sign-out success!");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  return (
    <div className="regular-size shadow">
      <div className="regular-size p-3">
        <div className="rounded-3 border border-2 border-black bg-white-dark content-1 p-3 position-relative">
          <div className="d-flex">
            <h1 className="fw-bold ms-2">To Do List</h1>
            <svg
              onClick={() => signOutClick()}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-box-arrow-left mt-1 position-absolute end-0 me-4"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
          </div>
          <div className="container">
            {tasks.length !== 0 ? (
              tasks.map((e, index) => (
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
              // setiap perubahan langsung disimpan ke state
              onChange={getInputValue}
              // valuenya langsung dari state
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
