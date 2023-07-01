import { updateData } from "../store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../store/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { setPomodoroStatus } from "../features/pomodoro/Pomodoro";
import { BsClock, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const Pomodoro = () => {
  const [user] = useAuthState(auth);
  const {
    pomodoroStatus,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    timeRemainingString,
  } = useSelector((state) => state.pomodoro);

  const dispatch = useDispatch();

  return (
    <div className="z-20 w-72 h-96 rounded-3xl border-2 border-slate-800 absolute bg-blue-400 p-4 flex justify-between flex-col lg:right-0 bottom-16 mr-1">
      <div className="items-center flex justify-between">
        <p className="font-bold text-2xl ml-2">Pomodoro</p>
      </div>
      <div className="grow mt-3 h-75 w-full bg-blue-200 rounded-xl mb-4 pb-3 flex flex-col justify-between">
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Pomodoro duration
            {pomodoroStatus !== "pomodoro" ? (
              <button
                title="Start pomodoro"
                disabled={pomodoroStatus === "pomodoro"}
                className="bg-transparent border-0"
                onClick={() => {
                  dispatch(setPomodoroStatus("pomodoro"));
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop pomodoro"
                className="bg-transparent border-0 "
                onClick={() => dispatch(setPomodoroStatus("stop"))}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full px-2"
            value={pomodoroDuration}
            onChange={(event) => {
              {
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
            {pomodoroStatus !== "shortBreak" ? (
              <button
                title="Start short break"
                disabled={pomodoroStatus === "shortBreak"}
                className="bg-transparent border-0 "
                onClick={() => {
                  dispatch(setPomodoroStatus("shortBreak"));
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
                <BsFillPauseFill
                  className="text-3xl"
                  onClick={() => dispatch(setPomodoroStatus("stop"))}
                />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full px-2"
            value={shortBreakDuration}
            onChange={(event) => {
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
            {pomodoroStatus !== "longBreak" ? (
              <button
                title="Start long break"
                disabled={pomodoroStatus === "longBreak"}
                className="bg-transparent border-0 "
                onClick={() => {
                  dispatch(setPomodoroStatus("longBreak"));
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop long break"
                className="bg-transparent border-0 "
                onClick={() => dispatch(setPomodoroStatus("stop"))}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className="rounded border-2 focus:outline-none focus:border-blue-300 focus:shadow-md w-full px-2"
            value={longBreakDuration}
            onChange={(event) => {
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
        <p className="">{timeRemainingString}</p>
      </div>
    </div>
  );
};

export default Pomodoro;
