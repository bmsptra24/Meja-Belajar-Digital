import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from 'react-icons/fa'
import { BsFire, BsCardHeading, BsSoundwave, BsSearch } from 'react-icons/bs'
import { CgMenuGridR } from 'react-icons/cg'
import { AiOutlineSetting } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import '../styles/Icon.css'
import '../styles/Footer.css'
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
  setMenu,
  setBlurting,
  setFeynman,
  setFlashCard,
  setMusic,
  setNote,
  setPomodoro,
  setSearch,
  setToDoList,
  setSetting,
  setHelp,
  setRank,
} from '../Features/Home/Home'
import { useState } from 'react'
import { RiMedalLine } from 'react-icons/ri'

const Footer = () => {
  // const navigate = useNavigate();
  const {
    menu,
    toDoList,
    note,
    blurting,
    flashCard,
    feynman,
    music,
    search,
    pomodoro,
    rank,
  } = useSelector((state) => state.home)
  const { timeRemainingString } = useSelector((state) => state.pomodoro)
  const { config } = useSelector((state) => state.database)
  const color = config.color
  const dispatch = useDispatch()

  const hideAllComponents = () => {
    dispatch(setMenu(false))
    dispatch(setToDoList(false))
    dispatch(setNote(false))
    dispatch(setBlurting(false))
    dispatch(setFeynman(false))
    dispatch(setFlashCard(false))
    dispatch(setMusic(false))
    dispatch(setSearch(false))
    dispatch(setPomodoro(false))
    dispatch(setRank(false))
    dispatch(setSetting(false))
    dispatch(setHelp(false))
  }
  const [isBurgerClicked, setIsBurgerClicked] = useState(false)

  const Icon = ({ Icon, isOpened }) => {
    return (
      <div
        className={
          'icon text-2xl select-none transition ease-out hover:bg-slate-300 ' +
            (isOpened && `border-${color}-500 border-4 shadow-md`) || ''
        }
      >
        <Icon />
      </div>
    )
  }

  return (
    <div className="z-40 footer-container bg-slate-50 ring-2 ring-slate-800 flex justify-center items-center border-solid border-x-0 border-b-0 w-screen h-13 lg:rounded-ss-3xl lg:rounded-se-3xl">
      {/* large screen */}
      <div className="w-full justify-center items-center hidden lg:flex">
        <div className="absolute left-0 ml-3 flex">
          <div
            title="Menu"
            onClick={() => {
              // hideAllComponents();
              dispatch(setMusic(false))
              dispatch(setPomodoro(false))
              dispatch(setMenu(!menu))
            }}
          >
            <Icon Icon={CgMenuGridR} />
          </div>
        </div>
        <div className="w-screen lg:w-auto justify-evenly flex">
          {!config?.taskbar?.todolist &&
            !config?.taskbar?.notes &&
            !config?.taskbar?.blurting &&
            !config?.taskbar?.flashcard &&
            !config?.taskbar?.rank &&
            !config?.taskbar?.feynman && (
              <div className="invisible">
                <Icon Icon={FaClipboardList} isOpened={toDoList} />
              </div>
            )}
          <div
            title="To Do List"
            onClick={() => {
              hideAllComponents()
              dispatch(setToDoList(!toDoList))
            }}
            className={`${config?.taskbar?.todolist ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaClipboardList} isOpened={toDoList} />
          </div>
          <div
            title="Notes"
            onClick={() => {
              hideAllComponents()
              dispatch(setNote(!note))
            }}
            className={`${config?.taskbar?.notes ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaRegStickyNote} isOpened={note} />
          </div>
          <div
            title="Blurting"
            onClick={() => {
              hideAllComponents()
              dispatch(setBlurting(!blurting))
            }}
            className={`${config?.taskbar?.blurting ? 'block' : 'hidden'}`}
          >
            <Icon Icon={BsFire} isOpened={blurting} />
          </div>
          <div
            title="Flashcard"
            onClick={() => {
              hideAllComponents()
              dispatch(setFlashCard(!flashCard))
            }}
            className={`${config?.taskbar?.flashcard ? 'block' : 'hidden'}`}
          >
            <Icon Icon={BsCardHeading} isOpened={flashCard} />
          </div>
          <div
            title="Feynman"
            onClick={() => {
              hideAllComponents()
              dispatch(setFeynman(!feynman))
            }}
            className={`${config?.taskbar?.feynman ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaChalkboardTeacher} isOpened={feynman} />
          </div>
          <div
            title="Rank"
            onClick={() => {
              hideAllComponents()
              dispatch(setRank(!rank))
            }}
            className={`${config?.taskbar?.rank ? 'block' : 'hidden'}`}
          >
            <Icon Icon={RiMedalLine} isOpened={rank} />
          </div>
        </div>
        <div className="absolute right-0 mr-3 flex">
          <div
            title="Search"
            onClick={() => {
              hideAllComponents()
              dispatch(setSearch(!search))
            }}
          >
            <Icon Icon={BsSearch} isOpened={search} />
          </div>
          <div
            title="Setting"
            onClick={() => {
              dispatch(setMusic(false))
              dispatch(setPomodoro(false))
              dispatch(setMenu(false))
              dispatch(setSetting(true))
            }}
          >
            <Icon Icon={AiOutlineSetting} />
          </div>
          <div
            title="Sound"
            onClick={() => {
              dispatch(setMusic(!music))
              dispatch(setMenu(false))
              dispatch(setPomodoro(false))
            }}
          >
            <Icon Icon={BsSoundwave} />
          </div>
          <div
            title="Pomodoro"
            className="pomodoro hover:bg-slate-300"
            onClick={() => {
              dispatch(setPomodoro(!pomodoro))
              dispatch(setMenu(false))
              dispatch(setMusic(false))
            }}
          >
            <div className="select-none">{timeRemainingString}</div>
          </div>
        </div>
      </div>

      {/* small screen */}
      <div className="relative h-14 w-full justify-center items-center flex lg:hidden">
        <div className="icon relative">
          <div
            className={
              isBurgerClicked === true
                ? 'absolute bottom-full mb-7 bg-slate-100 shadow-lg py-3 rounded-lg w-80 text-center z-50 visible'
                : 'absolute bottom-full mb-7 bg-slate-100 shadow-lg py-3 rounded-lg w-80 text-center z-50 hidden'
            }
          >
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
              }}
            >
              Home
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setToDoList(true))
              }}
            >
              Todolist
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setNote(true))
              }}
            >
              Note
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setBlurting(true))
              }}
            >
              Blurting
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setFlashCard(true))
              }}
            >
              Flashcard
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setFeynman(true))
              }}
            >
              Feynman
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setRank(true))
              }}
            >
              Rank
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setSearch(true))
              }}
            >
              Search
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                setIsBurgerClicked((e) => !e)
                dispatch(setPomodoro(false))
                dispatch(setMusic(!music))
              }}
            >
              Sound
            </p>
          </div>
          <RxHamburgerMenu
            className="text-2xl select-none"
            onClick={() => {
              setIsBurgerClicked((e) => !e)
              dispatch(setMusic(false))
            }}
          />
        </div>
        <div className="icon absolute right-5">
          <div
            className="select-none"
            onClick={() => {
              dispatch(setMusic(false))
              dispatch(setPomodoro(false))
              dispatch(setMenu(false))
              dispatch(setSetting(true))
            }}
          >
            <AiOutlineSetting className="text-3xl" />
          </div>
        </div>
        <div
          className="absolute left-5 pomodoro"
          onClick={() => {
            dispatch(setMusic(false))
            dispatch(setPomodoro(!pomodoro))
          }}
        >
          <div className="select-none text-xl">{timeRemainingString}</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
