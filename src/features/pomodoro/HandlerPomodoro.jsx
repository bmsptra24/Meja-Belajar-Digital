import {
  setTimeRemaining,
  setPomodoroDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setTimeRemainingString,
  setPomodoroStatus,
} from "./Pomodoro";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataRealtime } from "../../store/Database";
import { SendNotification } from "../../store/SendNotification";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../store/Firebase";
import { useEffect, useRef } from "react";

export const HandlerPomodoro = () => {
  const [user] = useAuthState(auth);
  const tempTimeRemaining = useRef(0);
  const tempTimeSet = useRef(0);
  const interval = useRef(null);
  const title = useRef("");
  const message = useRef("");

  const {
    pomodoroStatus,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
  } = useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();

  // get data from database
  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/pomodoro`, (snapshot) => {
      dispatch(setPomodoroDuration(snapshot.pomodoroDuration));
      dispatch(setShortBreakDuration(snapshot.shortBreak));
      dispatch(setLongBreakDuration(snapshot.longBreak));
    });
  }, [user.uid, dispatch]);

  useEffect(() => {
    // stop timer
    if (pomodoroStatus === "stop") {
      stopTimer();
      resetTimer();
      return;
    }
    // start timer
    if (pomodoroStatus !== "stop") {
      clearInterval(interval.current);

      if (pomodoroStatus === "pomodoro") {
        tempTimeSet.current = pomodoroDuration;
        title.current = "Pomodoro Finished!";
        message.current = "Pomodoro has finished. Let's get some break.";
      }
      if (pomodoroStatus === "shortBreak") {
        tempTimeSet.current = shortBreakDuration;
        title.current = "Short Break Finished!";
        message.current = "Short Break has finished. Let's continue our study.";
      }
      if (pomodoroStatus === "longBreak") {
        tempTimeSet.current = longBreakDuration;
        title.current = "Long Break Finished!";
        message.current = "Long Break has finished. Let's continue our study";
      }

      interval.current = setInterval(() => {
        if (tempTimeRemaining.current > tempTimeSet.current * 60) {
          dispatch(setPomodoroStatus("stop"));
          SendNotification(title.current, message.current);
          return;
        } else if (tempTimeRemaining.current <= tempTimeSet.current * 60) {
          dispatch(setTimeRemaining(tempTimeRemaining.current));
          formatTimer(tempTimeRemaining.current);
          tempTimeRemaining.current++;
        }
      }, 1000);
    }
  }, [pomodoroStatus, dispatch]);

  // convert duration timer in second to string (00:00)
  const formatTimer = (timeRemaining) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const string = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    dispatch(setTimeRemainingString(string));
    return;
  };

  const stopTimer = () => {
    clearInterval(interval.current);
    interval.current = null;
    dispatch(setTimeRemaining(0));
  };

  const resetTimer = () => {
    tempTimeRemaining.current = 0;
    formatTimer(0);
  };

  return <></>;
};
