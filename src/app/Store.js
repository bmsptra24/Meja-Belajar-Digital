import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/Pomodoro'
// import musicReducer from '../features/music/Music'

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    // music: musicReducer,
  },
})
