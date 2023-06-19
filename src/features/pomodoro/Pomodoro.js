import { createSlice } from '@reduxjs/toolkit'

export const isTimerRunningSlice = createSlice({
  name: 'isRunningPomodoro',
  initialState: {
    isPomodoroRunning: false,
    isShortBreakRunning: false,
    isLongBreakRunning: false,
    categoryRef: '',
    timerRef: 0,
    time: 0,
    timeString: '',
    isTimerRunning: false,
  }, 
  reducers: {
    setIsPomodoroRunning: (state, action) => {
      state.isPomodoroRunning = action.payload
    },
    setIsShortBreakRunning: (state, action) => {
      state.isShortBreakRunning = action.payload
    },
    setIsLongBreakRunning: (state, action) => {
      state.isLongBreakRunning = action.payload
    },
    setTimerRef: (state, action) => {
      state.timerRef = action.payload
    },
    setCategoryRef: (state, action) => {
      console.log(action.payload)
      state.categoryRef = action.payload
    },
    setTimeIncrement: (state) => {
      state.time++
    },
    setTimeReset: (state) => {
      state.time = 0
    },
    setTimeString: (state, action) => {
      state.timeString = action.payload
    },
    setIsTimerRunning: (state, action) => {
      state.isTimerRunning = action.payload
    },
  },
})

export const {
  setIsPomodoroRunning,
  setIsShortBreakRunning,
  setIsLongBreakRunning,
  setTimerRef,
  setCategoryRef,
  setTimeIncrement,
  setTimeReset,
  setTimeString,
  setIsTimerRunning,
} = isTimerRunningSlice.actions

export default isTimerRunningSlice.reducer
