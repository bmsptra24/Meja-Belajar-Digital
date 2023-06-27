import { BsTrash } from "react-icons/bs";
import { updateData } from "../Store/Database";

const Task = ({ tasks, index, user, setTasks }) => {
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

  return (
    tasks.length !== 0 && (
      <>
        <div className="text-lg flex justify-between mt-3">
          <div className="flex">
            <input
              type="checkbox"
              className="mr-3 cursor-pointer w-4 rounded-full"
              checked={tasks[index].checked}
              onChange={handleCheckboxChange}
            />
            <p className={tasks[index].checked ? "selected" : "unselected"}>
              {tasks[index].task}
            </p>
          </div>
          <BsTrash
            onClick={handleDeleteTask}
            className="cursor-pointer transition hover:text-red-700"
          />
        </div>
        <hr className="mt-1" />
      </>
    )
  );
};

export default Task;
