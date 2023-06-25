import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from "react-icons/fa";
import {
  BsCircle,
  BsFire,
  BsCardHeading,
  BsSoundwave,
  BsSearch,
} from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import "../styles/Icon.css";
import "../styles/Footer.css";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setBlurting,
  setFeynman,
  setFlashCard,
  setMusic,
  setNote,
  setPomodoro,
  setSearch,
  setToDoList,
} from "../features/home/Home";
import { useState } from "react";

const signOutClick = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

const Footer = () => {
  const navigate = useNavigate();
  const {
    toDoList,
    note,
    blurting,
    flashCard,
    feynman,
    music,
    search,
    pomodoro,
  } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const hideAllComponents = () => {
    dispatch(setToDoList(false));
    dispatch(setNote(false));
    dispatch(setBlurting(false));
    dispatch(setFeynman(false));
    dispatch(setFlashCard(false));
    dispatch(setMusic(false));
    dispatch(setSearch(false));
    dispatch(setPomodoro(false));
  };

  const Icon = ({ Icon, isOpened }) => {
    return (
      <div
        className={
          "icon text-2xl select-none transition ease-out hover:bg-slate-300 " +
            (isOpened && "border-blue-500 border-4 shadow-md") || ""
        }
      >
        <Icon />
      </div>
    );
  };

  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [isSettingClicked, setIsSettingClicked] = useState(false);

  return (
    <div className="z-10 footer-container bg-slate-50 ring-2 ring-slate-800 flex justify-center items-center border-solid border-x-0 border-b-0 w-screen h-13 lg:rounded-ss-3xl lg:rounded-se-3xl">
      {/* large screen */}
      <div className="w-full justify-center items-center hidden lg:flex">
        <div className="absolute left-0 ml-3 flex">
          <div
            title="Home"
            onClick={() => {
              hideAllComponents();
            }}
          >
            <Icon Icon={BsCircle} />
          </div>
          <div
            title="Logout"
            onClick={() => {
              signOutClick();
            }}
          >
            <Icon Icon={BiLogOutCircle} />
          </div>
        </div>
        <div className="w-screen lg:w-auto justify-evenly flex">
          <div
            title="To Do List"
            onClick={() => {
              hideAllComponents();
              dispatch(setToDoList(!toDoList));
            }}
          >
            <Icon Icon={FaClipboardList} isOpened={toDoList} />
          </div>
          <div
            title="Notes"
            onClick={() => {
              hideAllComponents();
              dispatch(setNote(!note));
            }}
          >
            <Icon Icon={FaRegStickyNote} isOpened={note} />
          </div>
          <div
            title="Blurting"
            onClick={() => {
              hideAllComponents();
              dispatch(setBlurting(!blurting));
            }}
          >
            <Icon Icon={BsFire} isOpened={blurting} />
          </div>
          <div
            title="Flashcard"
            onClick={() => {
              hideAllComponents();
              dispatch(setFlashCard(!flashCard));
            }}
          >
            <Icon Icon={BsCardHeading} isOpened={flashCard} />
          </div>
          <div
            title="Feynman"
            onClick={() => {
              hideAllComponents();
              dispatch(setFeynman(!feynman));
            }}
          >
            <Icon Icon={FaChalkboardTeacher} isOpened={feynman} />
          </div>
          <div
            title="Search"
            onClick={() => {
              hideAllComponents();
              dispatch(setSearch(!search));
            }}
          >
            <Icon Icon={BsSearch} isOpened={search} />
          </div>
        </div>
        <div className="absolute right-0 mr-3 flex">
          <div
            title="Setting"
            onClick={() => {
              navigate("/setting");
            }}
          >
            <Icon Icon={AiOutlineSetting} />
          </div>
          <div
            title="Music"
            onClick={() => {
              dispatch(setMusic(!music));
              dispatch(setPomodoro(false));
            }}
          >
            <Icon Icon={BsSoundwave} />
          </div>
          <div
            title="Pomodoro"
            className="pomodoro hover:bg-slate-300"
            onClick={() => {
              dispatch(setPomodoro(!pomodoro));
              dispatch(setMusic(false));
            }}
          >
            <div className="select-none">25:00</div>
          </div>
        </div>
      </div>

      {/* small screen */}
      <div className="relative w-full justify-center items-center flex lg:hidden">
        <div className="icon relative">
          <div
            className={
              isBurgerClicked === true
                ? "absolute bottom-full mb-7 bg-slate-200 shadow-md py-3 rounded-lg w-80 text-center z-50 visible"
                : "absolute bottom-full mb-7 bg-slate-200 shadow-md py-3 rounded-lg w-80 text-center z-50 hidden"
            }
          >
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
              }}
            >
              Home
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setToDoList(true));
              }}
            >
              Todolist
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setNote(true));
              }}
            >
              Note
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setBlurting(true));
              }}
            >
              Blurting
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setFlashCard(true));
              }}
            >
              Flashcard
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setFeynman(true));
              }}
            >
              Feynman
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
                dispatch(setSearch(true));
              }}
            >
              Search
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                setIsBurgerClicked((e) => !e);
                dispatch(setPomodoro(false));
                dispatch(setMusic(!music));
              }}
            >
              Music
            </p>
          </div>
          <RxHamburgerMenu
            className="text-2xl select-none"
            onClick={() => setIsBurgerClicked((e) => !e)}
          />
        </div>
        <div className="icon absolute right-5">
          <div
            className="select-none"
            onClick={() => setIsSettingClicked((e) => !e)}
          >
            <div
              className={
                isSettingClicked === true
                  ? "absolute bottom-full right-0 mb-7 bg-slate-200 p-2 rounded-lg text-center z-50 visible"
                  : "absolute bottom-full mb-7 bg-slate-200 p-2 rounded-lg w-80 text-center z-50 hidden"
              }
            >
              <p
                className="hover:bg-slate-300 p-2 rounded"
                onClick={() => {
                  hideAllComponents();
                  setIsSettingClicked((e) => !e);
                  signOutClick();
                }}
              >
                Logout
              </p>
            </div>
            <AiOutlineSetting className="text-3xl" />
          </div>
        </div>
        <div
          className="absolute left-5 pomodoro"
          onClick={() => {
            dispatch(setMusic(false));
            dispatch(setPomodoro(!pomodoro));
          }}
        >
          <div className="select-none text-xl">25:00</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
