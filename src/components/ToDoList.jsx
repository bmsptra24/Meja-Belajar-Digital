import { signOut, getAuth } from "firebase/auth";
import Task from "./Task";
import { useState } from "react";
import "../styles/ToDoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
//bug: harus disepasi dulu baru tampilan berubah, klik sampah tampilan hilang tapi didata tidak hilang

const Home = () => {
  const [tasks, setTasks] = useState(["Memasak", "buat pr", "ngoding"]);
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
          {tasks.map((e, index) => (
            <Task task={e} index={index} key={index} />
          ))}
        </div>
        <div className="new-task-container d-flex justify-content-evenly align-items-center">
          <input
            type="text"
            className="form-control input-task"
            placeholder="New Task"
            onChange={getInputValue}
          />
          <svg
            onClick={() => {
              tasks.push(inputValue);
              console.log(tasks);
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

export default Home;
