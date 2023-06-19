import { updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { setIsTimerRunning } from "../features/pomodoro/Pomodoro";
import { BsClock, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import "../styles/Pomodoro.css";
import { useState, useEffect, useRef } from "react";
import { HOFPomodoro } from "../features/pomodoro/HOFPomodoro";

// realtime databe
const DataRealtime = (path, callback) => {
  const transferData = (snapshot) => {
    callback(snapshot);
  };
  const dbRef = ref(getDatabase(), path);
  onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
      transferData(snapshot.val());
    }
  });
};

const Pomodoro = () => {
  const [user] = useAuthState(auth);
  const [pomodoroDuration, setPomodoroDuration] = useState();
  const [shortBreak, setShortBreak] = useState();
  const [longBreak, setLongBreak] = useState();
  const duration = useRef(null);

  const { isPomodoroRunning, isShortBreakRunning, isLongBreakRunning } =
    useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();

  // get data from database
  useEffect(() => {
    DataRealtime(`users/${user.uid}/pomodoro`, (snapshot) => {
      setPomodoroDuration(snapshot.pomodoroDuration);
      setShortBreak(snapshot.shortBreak);
      setLongBreak(snapshot.longBreak);
    });
  }, []);

  return (
    <div className="pop-up-size p-4 d-flex justify-content-between flex-column end-0 bottom-0 me-1">
      <div>
        <p className="fs-2 fw-bold border-bottom border-black border-3">
          Pomodoro
        </p>
      </div>
      <div className="h-75 w-100 blue-shadow rounded rounded-4 mb-4 pb-3 d-flex flex-column justify-content-between">
        <div className="w-100 px-4 pt-3">
          <p className="d-flex justify-content-between">
            Pomodoro duration
            {!isPomodoroRunning ? (
              <button
                disabled={isShortBreakRunning || isLongBreakRunning}
                className="bg-transparent border-0"
                onClick={() => {
                  duration.current = pomodoroDuration;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              <button
                className="bg-transparent border-0"
                onClick={() => console.log("ResetTimer()")}
              >
                <BsFillPauseFill className="fs-4" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100 input-pomodoro"
            value={pomodoroDuration}
            onChange={(event) => {
              {
                setPomodoroDuration(Number(event.target.value));
                updateData(
                  ["users/" + user.uid + "/pomodoro/pomodoroDuration"],
                  Number(event.target.value)
                );
              }
            }}
          />
        </div>
        <div className="w-100 px-4 pt-3">
          <p className="d-flex justify-content-between">
            Short break
            {!isShortBreakRunning ? (
              <button
                disabled={isPomodoroRunning || isLongBreakRunning}
                className="bg-transparent border-0"
                onClick={() => {
                  duration.current = shortBreak;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              // Not work yet
              <button
                className="bg-transparent border-0"
                onClick={() => console.log("ResetTimer()")} // reset the timer
              >
                <BsFillPauseFill className="fs-4" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100"
            value={shortBreak}
            onChange={(event) => {
              setShortBreak(Number(event.target.value));
              updateData(
                ["users/" + user.uid + "/pomodoro/shortBreak"],
                Number(event.target.value)
              );
            }}
          />
        </div>
        <div className="w-100 px-4 pt-3">
          <p className="d-flex justify-content-between">
            Long break
            {!isLongBreakRunning ? (
              <button
                disabled={isPomodoroRunning || isShortBreakRunning}
                className="bg-transparent border-0"
                onClick={() => {
                  duration.current = longBreak;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              <button
                className="bg-transparent border-0"
                onClick={() => console.log("ResetTimer()")}
              >
                <BsFillPauseFill className="fs-4" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-0 w-100 "
            value={longBreak}
            onChange={(event) => {
              setLongBreak(Number(event.target.value));
              updateData(
                ["users/" + user.uid + "/pomodoro/longBreak"],
                Number(event.target.value)
              );
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <BsClock className="me-2 mb-2" />
        <p className="mt-2">{<HOFPomodoro duration={duration.current} />}</p>
      </div>
    </div>
  );
};

export default Pomodoro;
