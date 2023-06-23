import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/Pomodoro'
import homeReducer from '../features/home/Home'
// import musicReducer from '../features/music/Music'

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    home: homeReducer,
    // music: musicReducer,
  },
})
