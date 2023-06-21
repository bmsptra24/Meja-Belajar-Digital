import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    toDoList: false,
    note: false,
    blurting: false,
    flashCard: false,
    feynman: false,
    music: false,
    search: false,
    pomodoro: false,
  },
  reducers: {
    setToDoList: (state, action) => {
      state.toDoList = action.payload
    },
    setNote: (state, action) => {
      state.note = action.payload
    },
    setBlurting: (state, action) => {
      state.blurting = action.payload
    },
    setFlashCard: (state, action) => {
      state.flashCard = action.payload
    },
    setFeynman: (state, action) => {
      state.feynman = action.payload
    },
    setMusic: (state, action) => {
      state.music = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setPomodoro: (state, action) => {
      state.pomodoro = action.payload
    },
  },
})

export const {
  setToDoList,
  setNote,
  setBlurting,
  setFlashCard,
  setFeynman,
  setMusic,
  setSearch,
  setPomodoro,
} = homeSlice.actions

export default homeSlice.reducer
