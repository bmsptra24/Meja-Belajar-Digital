import "bootstrap/dist/css/bootstrap.min.css";
import { updateData } from "../Store/Database";

const Task = ({ tasks, index, user, setTasks }) => {
  return (
    tasks.length !== 0 && (
      <div className="border-bottom fs-5 task">
        <div className="d-flex ">
          <input
            type="checkbox"
            className="me-3 checkbox"
            checked={tasks[index].checked}
            defaultChecked={false}
            onChange={() =>
              updateData(
                `users/${user.uid}/tasks/${index}/checked`,
                !tasks[index].checked
              )
            }
          />
          <p className={tasks[index].checked ? "selected" : "unselected"}>
            {tasks[index].task}
          </p>
        </div>
        <svg
          onClick={() => {
            tasks.splice(index, 1);
            updateData(`users/${user.uid}/tasks/`, tasks);
            tasks.length === 0 && setTasks([]);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-trash mt-1 trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
      </div>
    )
  );
};

export default Task;
