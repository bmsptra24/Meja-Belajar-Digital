import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    menu: false,
    toDoList: false,
    note: false,
    blurting: false,
    flashCard: false,
    feynman: false,
    music: false,
    search: false,
    pomodoro: false,
    setting: false,
    help: false,
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload
    },
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
    setSetting: (state, action) => {
      state.setting = action.payload
    },
    setHelp: (state, action) => {
      state.help = action.payload
    },
  },
})

export const {
  setMenu,
  setToDoList,
  setNote,
  setBlurting,
  setFlashCard,
  setFeynman,
  setMusic,
  setSearch,
  setPomodoro,
  setSetting,
  setHelp,
} = homeSlice.actions

export default homeSlice.reducer
