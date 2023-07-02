import { BsTrash } from "react-icons/bs";
import { updateData } from "../store/Database";
import { useState } from "react";

const Task = ({ tasks, index, user, setTasks }) => {
  const [isTaskClicked, setIsTaskClicked] = useState(false);

  const handleCheckboxChange = () => {
    const updatedCheckedValue = !tasks[index].checked;
    updateData(`users/${user.uid}/tasks/${index}/checked`, updatedCheckedValue);
  };

  const handleDeleteTask = () => {
    tasks.splice(index, 1);
    updateData(`users/${user.uid}/tasks/`, tasks);
    if (tasks.length === 0) {
      setTasks([]);
    }
  };

  const handleDate = (event) => {
    updateData(`users/${user.uid}/tasks/${index}/date`, event.target.value);
  };

  return (
    tasks.length !== 0 && (
      <>
        <div
          className={
            isTaskClicked
              ? "text-lg flex flex-col justify-between items-start border-b-2 px-2 pt-1 pb-1 cursor-pointer bg-blue-100 hover:bg-blue-100"
              : "text-lg flex flex-col justify-center items-center border-b-2 p-2 cursor-pointer hover:bg-blue-100"
          }
          onClick={() => {
            setIsTaskClicked(true);
          }}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex">
              <input
                type="checkbox"
                className="mr-3 cursor-pointer w-4 rounded-full mt-2 lg:mt-0"
                checked={tasks[index].checked}
                onChange={handleCheckboxChange}
              />
              <div className={tasks[index].checked ? "selected" : "unselected"}>
                {tasks[index].task}
                {!isTaskClicked && tasks[index].date !== "" && (
                  <div className="text-sm bg-blue-200 px-2 rounded-3xl w-max mt-2">
                    <p>{tasks[index].date}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
  
              <BsTrash
                onClick={handleDeleteTask}
                className="ml-3 cursor-pointer transition hover:text-red-700"
              />
            </div>
          </div>
          {isTaskClicked && (
            <>
              <input
                type="date"
                name="date"
                id="date"
                value={tasks[index].date}
                className={
                  "text-sm bg-transparent focus:outline-none " +
                  (tasks[index].date ? "ml-7 w-24" : "ml-6 w-5")
                }
                onChange={handleDate}
              />
            </>
          )}
        </div>
      </>
    )
  );
};

export default Task;
