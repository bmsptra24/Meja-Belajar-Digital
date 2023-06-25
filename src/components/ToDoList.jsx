import { BsPlusLg } from "react-icons/bs";
import Task from "./Task";
import { useState, useEffect } from "react";
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
    <div className="z-10 lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-xl lg:bg-blue-300">
      <div className="h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-blue-400">
        <div className="h-full w-full rounded-md lg:border-2 border-black py-3 pr-3 pl-6 bg-slate-50 lg:bg-blue-50 flex flex-col">
          <h1 className="font-bold mt-2 text-4xl">To Do List</h1>
          <div className="grow overflow-y-scroll pr-3 mt-3">
            {tasks.length !== 0 ? (
              tasks.map((_, index) => (
                <>
                  <Task
                    tasks={tasks}
                    index={index}
                    user={user}
                    key={index}
                    setTasks={setTasks}
                  />
                  <hr className="mt-1" />
                </>
              ))
            ) : (
              <div>Tidak ada task</div>
            )}
          </div>
          <div className="flex justify-between items-center mt-3 drop-shadow-md lg:drop-shadow-none">
            <input
              type="text"
              className="transition ease-out grow h-5/6 border-2 bg-slate-50 lg:bg-blue-50 border-slate-400 focus:outline-none focus:bg-slate-50 focus:ring-slate-300 focus:ring-2 rounded-lg p-3"
              placeholder="New Task"
              onChange={getInputValue}
              value={inputValue}
            />
            <button
              className="transition ease-out icon bg-blue-300 border-2 border-blue-500 hover:bg-blue-400 hover:border-r-blue-600 hover:shadow-md focus:bg-blue-400 focus:shadow-md focus:outline-none focus:border-r-blue-600"
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
