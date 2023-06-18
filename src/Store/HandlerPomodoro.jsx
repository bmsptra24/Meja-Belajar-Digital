// import { useState, useRef } from "react";
import State from "./State";
// ERROR setIsRunningPomodoro is not a function
const {
  isRunningPomodoro,
  setIsRunningPomodoro,
  isRunnningShortBreak,
  setIsRunningShortBreak,
  isRunningLongBreak,
  setIsRunningLongBreak,
} = State;
let { categoryRef, timerRef } = State;

// export const HendlerPomodoro = () => {
// const [pomodoroDuration, setPomodoroDuration] = useState();
// const [shortBreak, setShortBreak] = useState();
// const [longBreak, setLongBreak] = useState();
// const [time, setTime] = useState(0);
// const [category, setCategory] = useState();

// const [isRunningPomodoro, setIsRunningPomodoro] = useState(false);
// const [isRunnningShortBreak, setIsRunningShortBreak] = useState(false);
// const [isRunningLongBreak, setIsRunningLongBreak] = useState(false);

// const [isRunningLongBreak, setIsRunningLongBreak] = useState(false);

// const timerRef = useRef(null);
// const category = useRef(null);

export const sendNotification = () => {
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

export const formatTime = (timeInSeconds, duration) => {
  if (timeInSeconds <= duration * 60) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else if (timeInSeconds >= duration * 60) {
    resetTimer();
    sendNotification();
  }
};

export const startTimer = (setTime) => {
  console.log(categoryRef);
  if (categoryRef === "Pomodoro") {
    if (!isRunningPomodoro) {
      setIsRunningPomodoro(true);
    }
  } else if (categoryRef === "Short Break") {
    if (!isRunnningShortBreak) {
      setIsRunningShortBreak(true);
    }
  } else if (categoryRef === "Long Break") {
    if (!isRunningLongBreak) {
      setIsRunningLongBreak(true);
    }
  }
  categoryRef = setInterval(() => {
    setTime((prevTime) => prevTime + 1);
  }, 1000);
};

export const stopTimer = () => {
  setIsRunningPomodoro(false);
  setIsRunningShortBreak(false);
  setIsRunningLongBreak(false);
  clearInterval(timerRef);
};

export const resetTimer = (setTime) => {
  stopTimer();
  setTime(0);
};

//   return {
//     formatTime,
//     startTimer,
//     resetTimer,
//     categoryRef,
//     isRunningPomodoro,
//     isRunnningShortBreak,
//     isRunningLongBreak,
//   };
// };
