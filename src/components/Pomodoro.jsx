import { updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { formatTime, startTimer, resetTimer } from "../Store/HandlerPomodoro";
import State from "../Store/State";
const { isRunningPomodoro, isRunnningShortBreak, isRunnningLongBreak } = State;

let { categoryRef } = State;

import { BsClock, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import "../styles/Pomodoro.css";
import { useState, useEffect } from "react";

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
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [category, categoryRef.current =  = useState();
  // const [isRunningPomodoro, setIsRunningPomodoro] = useState(false);
  // const [isRunnningShortBreak, setIsRunnningShortBreak] = useState(false);
  // const [isRunnningLongBreak, setIsRunnningLongBreak] = useState(false);
  // const [isRunningLongBreak, setIsRunningLongBreak] = useState(false);
  // const timerRef = useRef(null);
  // const categoryRef = useRef(null);

  // const sendNotification = () => {
  //   if (Notification.permission === "granted") {
  //     new Notification(categoryRef.current + " Finished!", {
  //       body:
  //         "The " + categoryRef.current + " has finished. Let's get some break.",
  //     });
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         new Notification(categoryRef.current + " Finished!", {
  //           body:
  //             "The " +
  //             categoryRef.current +
  //             " has finished. Let's get some break.",
  //         });
  //       }
  //     });
  //   }
  // };

  // const formatTime = (timeInSeconds) => {
  //   if (timeInSeconds <= duration * 60) {
  //     const minutes = Math.floor(timeInSeconds / 60);
  //     const seconds = timeInSeconds % 60;

  //     return `${minutes.toString().padStart(2, "0")}:${seconds
  //       .toString()
  //       .padStart(2, "0")}`;
  //   } else if (timeInSeconds >= duration * 60) {
  //     resetTimer();
  //     sendNotification();
  //   }
  // };

  // const startTimer = () => {
  //   console.log(categoryRef.current);
  //   if (categoryRef.current === "Pomodoro") {
  //     if (!isRunningPomodoro) {
  //       setIsRunningPomodoro(true);
  //     }
  //   } else if (categoryRef.current === "Short Break") {
  //     if (!isRunnningShortBreak) {
  //       setIsRunnningShortBreak(true);
  //     }
  //   } else if (categoryRef.current === "Long Break") {
  //     if (!isRunnningLongBreak) {
  //       setIsRunnningLongBreak(true);
  //     }
  //   }
  //   timerRef.current = setInterval(() => {
  //     setTime((prevTime) => prevTime + 1);
  //   }, 1000);
  // };

  // const stopTimer = () => {
  //   setIsRunningPomodoro(false);
  //   setIsRunnningShortBreak(false);
  //   setIsRunnningLongBreak(false);
  //   clearInterval(timerRef.current);
  // };

  // const resetTimer = () => {
  //   stopTimer();
  //   setTime(0);
  // };

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
            {!isRunningPomodoro ? (
              <button
                disabled={isRunnningShortBreak || isRunnningLongBreak}
                className="bg-transparent border-0"
                onClick={() => {
                  setDuration(pomodoroDuration);
                  categoryRef = "Pomodoro";
                  startTimer(setTime);
                  updateData(
                    ["users/" + user.uid + "/pomodoro/timeStamp"],
                    new Date().getTime()
                  );
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              <button
                className="bg-transparent border-0"
                onClick={() => resetTimer(setTime)}
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
            {!isRunnningShortBreak ? (
              <button
                disabled={isRunningPomodoro || isRunnningLongBreak}
                className="bg-transparent border-0"
                onClick={() => {
                  setDuration(shortBreak);
                  categoryRef = "Short Break";
                  startTimer(setTime);
                  updateData(
                    ["users/" + user.uid + "/pomodoro/timeStamp"],
                    new Date().getTime()
                  );
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              <button
                className="bg-transparent border-0"
                onClick={() => resetTimer(setTime)}
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
            {!isRunnningLongBreak ? (
              <button
                disabled={isRunningPomodoro || isRunnningShortBreak}
                className="bg-transparent border-0"
                onClick={() => {
                  setDuration(longBreak);
                  categoryRef = "Long Break";
                  startTimer(setTime);
                  updateData(
                    ["users/" + user.uid + "/pomodoro/timeStamp"],
                    new Date().getTime()
                  );
                }}
              >
                <BsFillPlayFill className="fs-4" />
              </button>
            ) : (
              <button
                className="bg-transparent border-0"
                onClick={() => resetTimer(setTime)}
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
        <p className="mt-2">{formatTime(time, duration)}</p>
      </div>
    </div>
  );
};

export default Pomodoro;
