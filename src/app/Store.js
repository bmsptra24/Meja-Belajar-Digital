import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../features/pomodoro/Pomodoro'
import homeReducer from '../features/home/Home'
import isLoadingReducer from '../features/loading/isLoading'
// import musicReducer from '../features/music/Music'

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    home: homeReducer,
    isLoading: isLoadingReducer,
    // music: musicReducer,
  },
})
