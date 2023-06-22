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
      <div className="border-bottom fs-5 task">
        <div className="d-flex">
          <input
            type="checkbox"
            className="me-3 checkbox cursor-pointer"
            checked={tasks[index].checked}
            onChange={handleCheckboxChange}
          />
          <p className={tasks[index].checked ? "selected" : "unselected"}>
            {tasks[index].task}
          </p>
        </div>
        <BsTrash onClick={handleDeleteTask} />
      </div>
    )
  );
};

export default Task;
