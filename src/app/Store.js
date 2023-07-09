import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../Features/pomodoro/Pomodoro'
import homeReducer from '../Features/home/Home'
import isLoadingReducer from '../Features/loading/isLoading'
import toastsReducer from '../Features/toasts/Toasts'
import musicReducer from '../Features/music/Music'

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    home: homeReducer,
    isLoading: isLoadingReducer,
    toasts: toastsReducer,
    music: musicReducer,
  },
})
