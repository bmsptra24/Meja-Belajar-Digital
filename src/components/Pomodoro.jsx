// import { newKey, updateData } from "../Store/Database";
// import { newKey, updateData } from "../Store/Database";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../Store/Firebase";
// import { getDatabase, ref, onValue } from "firebase/database";

import { BsClock } from "react-icons/bs";
import "../styles/Pomodoro.css";
const Pomodoro = () => {
  return (
    <div className="pop-up-size p-4 d-flex justify-content-between flex-column end-0 bottom-0 me-1">
      <div>
        <p className="fs-2 fw-bold border-bottom border-black border-3">
          Pomodoro
        </p>
      </div>
      <div className="h-75 w-100 blue-shadow rounded rounded-4 mb-4 pb-3 d-flex flex-column justify-content-between">
        <div className="w-100 px-4 pt-3">
          <p className="">Pomodoro duration</p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100 input-pomodoro"
          />
        </div>
        <div className="w-100 px-4 pt-3">
          <p className="">Short break</p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100"
          />
        </div>
        <div className="w-100 px-4 pt-3">
          <p className="">Long break</p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100 "
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <BsClock className="me-2 mb-2" />
        <p className="mt-2">Minggu, 2 April 2023</p>
      </div>
    </div>
  );
};

export default Pomodoro;
