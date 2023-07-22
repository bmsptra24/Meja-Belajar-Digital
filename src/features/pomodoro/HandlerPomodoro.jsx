import {
  setTimeRemaining,
  setPomodoroDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setTimeRemainingString,
  setPomodoroStatus,
  setCountPomodoro,
} from "./Pomodoro";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataRealtime, updateData } from "../../Store/Database";
import { SendNotification } from "../../Store/SendNotification";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Store/Firebase";
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
    countPomodoro,
  } = useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();

  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/pomodoro`, (snapshot) => {
        dispatch(setPomodoroDuration(snapshot.pomodoroDuration));
        dispatch(setShortBreakDuration(snapshot.shortBreak));
        dispatch(setLongBreakDuration(snapshot.longBreak));
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    // stop timer
    if (pomodoroStatus === "stop") {
      stopTimer();
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
          SendNotification(title.current, message.current);
          stopTimer();
          resetTimer();
          if (pomodoroStatus === "pomodoro") {
            dispatch(setCountPomodoro(countPomodoro + 1));
            if ((countPomodoro - 1) % 3 === 0) {
              return dispatch(setPomodoroStatus("longBreak"));
            }
            return dispatch(setPomodoroStatus("shortBreak"));
          }
          if (
            pomodoroStatus === "shortBreak" ||
            pomodoroStatus === "longBreak"
          ) {
            return dispatch(setPomodoroStatus("pomodoro"));
          }
          dispatch(setPomodoroStatus("stop"));
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
