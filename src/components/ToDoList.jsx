import { signOut, getAuth } from "firebase/auth";
import Task from "./Task";
import { useState } from "react";
import "../styles/ToDoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getDataUser,
  writeNewTask,
  updateTask,
  deleteTask,
} from "../Store/Database";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
// import { set } from "firebase/database";

//bug: harus disepasi dulu baru tampilan berubah, klik sampah tampilan hilang tapi didata tidak hilang
// function debug(params) {
//   console.log(params);
// }

const getDataTasks = async (user, select) => {
  let data = await getDataUser(user);

  if (data.tasks) {
    if (select === "value") {
      data = Object.entries(data.tasks).map((e, ind) => {
        return e[1];
      });
    } else if (select === "key") {
      data = Object.entries(data.tasks).map((e, ind) => {
        // console.log(data);
        return e[0];
      });
    }
    return data ? data : ["Tidak ada data!"];
  }
};

const ToDoList = () => {
  const [user] = useAuthState(auth);

  // membuat state tasks
  const [tasks, setTasks] = useState([]);
  // const [key, setKey] = useState([]);

  getDataTasks(user, "value") // diisi dari sini
    .then((result) => {
      // karena resultnya masih promise, jadi pkk then
      setTasks(result); // result dimasukan ke state
    })
    .catch((error) => console.log(error));

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

  const setCheckedFunction = (index) => {
    // jika item checked di object tasks index ke x = true

    // ambil data key
    getDataTasks(user, "key") // state key diisi dari sini
      .then((result) => {
        // karena resultnya masih promise, jadi pkk then
        const key = result; // result dimasukan ke state

        // mengganti status check
        if (key !== undefined) {
          tasks.map((task, idx) => {
            if (idx === index) {
              if (task.checked) {
                updateTask(user, key[idx], { ...task, checked: false }); // ubah didatabase
              } else {
                updateTask(user, key[idx], { ...task, checked: true });
              }
            }
          });
          // setTasks(() => {
          //   return tasks.map((task, idx) => {
          //     if (idx === index) {
          //       if (task.checked) {
          //         updateTask(user, key[idx], { ...task, checked: false }); // ubah didatabase
          //         return { ...task, checked: false }; // ubah ke false (ditampilan)
          //       } else {
          //         updateTask(user, key[idx], { ...task, checked: true });
          //         return { ...task, checked: true }; // begitupun sebaliknya
          //       }
          //     } else {
          //       return task;
          //     }
          //   });
          // });
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="belakang-todolist">
      <div className="todolist-container rounded-3">
        <div className="d-flex">
          <h1 className="fw-bold">To Do List</h1>
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
              fill-rule="evenodd"
              d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
            />
            <path
              fill-rule="evenodd"
              d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
            />
          </svg>
        </div>
        <div className="container">
          {tasks !== undefined
            ? tasks.map((e, index) => (
                <Task
                  tasks={tasks}
                  setCheckedFunction={setCheckedFunction}
                  index={index}
                  deleteTask={deleteTask}
                  user={user}
                  getDataTasks={getDataTasks}
                  key={index}
                />
              ))
            : "Tidak ada task..."}
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
          <svg
            onClick={(event) => {
              // ubah isi tasks di database
              writeNewTask(user, inputValue);
              // kosongkan value state inputValue
              setInputValue("");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="bi bi-plus-circle-fill icon-plus me-2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
