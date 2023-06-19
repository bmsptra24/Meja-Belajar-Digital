import { useSelector, useDispatch } from "react-redux";
import {
  setIsLongBreakRunning,
  setIsPomodoroRunning,
  setIsShortBreakRunning,
  setTimeIncrement,
  setTimeReset,
  setTimeString,
  setIsTimerRunning,
} from "../../features/pomodoro/Pomodoro";
import { useRef } from "react";

// !The interval wont stop

export const HOFPomodoro = ({ duration }) => {
  const intervalTimer = useRef(null);

  const {
    isPomodoroRunning,
    isShortBreakRunning,
    isLongBreakRunning,
    time,
    categoryRef,
    isTimerRunning,
    timeString,
  } = useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();

  const SendNotification = () => {
    if (Notification.permission === "granted") {
      new Notification(categoryRef + " Finished!", {
        body: "The " + categoryRef + " has finished. Let's get some break.",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(categoryRef + " Finished!", {
            body: "The " + categoryRef + " has finished. Let's get some break.",
          });
        }
      });
    }
  };

  const StopTimer = () => {
    dispatch(setIsTimerRunning(false));
    dispatch(setIsPomodoroRunning(false));
    dispatch(setIsShortBreakRunning(false));
    dispatch(setIsLongBreakRunning(false));
    if (intervalTimer.current) {
      clearInterval(intervalTimer.current);
      intervalTimer.current = null;
    }
  };

  const ResetTimer = () => {
    StopTimer();
    dispatch(setTimeReset());
  };

  const StartTimer = (duration) => {
    if (categoryRef === "Pomodoro") {
      if (!isPomodoroRunning) {
        dispatch(setIsPomodoroRunning(true));
      }
    } else if (categoryRef === "Short Break") {
      if (!isShortBreakRunning) {
        dispatch(setIsShortBreakRunning(true));
      }
    } else if (categoryRef === "Long Break") {
      if (!isLongBreakRunning) {
        dispatch(setIsLongBreakRunning(true));
      }
    }

    intervalTimer.current = setInterval(() => {
      dispatch(setTimeIncrement());
      if (time <= duration * 60) {
        console.log(time, duration * 60);

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const string = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        dispatch(setTimeString(string));
        console.log(string);
        return string;
      }
      if (time >= duration * 60) {
        ResetTimer();
        SendNotification();
        clearInterval(intervalTimer.current);
        intervalTimer.current = null;
      }
    }, 1000);
  };

  isTimerRunning && StartTimer(duration);
  return <>{timeString ? timeString : "00:00"}</>;
};
