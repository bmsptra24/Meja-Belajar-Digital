import { updateData, fetchDataRealtime } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { setIsTimerRunning } from "../features/pomodoro/Pomodoro";
import { BsClock, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import "../styles/Pomodoro.css";
import { useState, useEffect, useRef } from "react";
import { HOFPomodoro } from "../features/pomodoro/HOFPomodoro";

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
    fetchDataRealtime(`users/${user.uid}/pomodoro`, (snapshot) => {
      setPomodoroDuration(snapshot.pomodoroDuration);
      setShortBreak(snapshot.shortBreak);
      setLongBreak(snapshot.longBreak);
    });
  }, [user.uid]);

  return (
    <div className="z-20 w-72 h-96 rounded-3xl border-2 border-slate-800 absolute bg-blue-400 p-4 flex justify-between flex-col lg:right-0 bottom-16 mr-1">
      <div className="items-center flex justify-between">
        <p className="font-bold text-2xl ml-2">Pomodoro</p>
      </div>
      <div className="grow mt-3 h-75 w-full bg-blue-200 rounded-xl mb-4 pb-3 flex flex-col justify-between">
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Pomodoro duration
            {!isPomodoroRunning ? (
              <button
                title="Start pomodoro"
                disabled={isShortBreakRunning || isLongBreakRunning}
                className="bg-transparent border-0  "
                onClick={() => {
                  duration.current = pomodoroDuration;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop pomodoro"
                className="bg-transparent border-0 "
                onClick={() => console.log("ResetTimer()")}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full "
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
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Short break
            {!isShortBreakRunning ? (
              <button
                title="Start short break"
                disabled={isPomodoroRunning || isLongBreakRunning}
                className="bg-transparent border-0 "
                onClick={() => {
                  duration.current = shortBreak;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              // Not work yet
              <button
                title="Stop short break"
                className="bg-transparent border-0 "
                onClick={() => console.log("ResetTimer()")} // reset the timer
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full "
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
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Long break
            {!isLongBreakRunning ? (
              <button
                title="Start long break"
                disabled={isPomodoroRunning || isShortBreakRunning}
                className="bg-transparent border-0 "
                onClick={() => {
                  duration.current = longBreak;
                  dispatch(setIsTimerRunning(true));
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop long break"
                className="bg-transparent border-0 "
                onClick={() => console.log("ResetTimer()")}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full "
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
      <div className="flex justify-center items-center">
        <BsClock className="mr-2" />
        <p className="">{<HOFPomodoro duration={duration.current} />}</p>
      </div>
    </div>
  );
};

export default Pomodoro;
