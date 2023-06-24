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
      alert("Sign-out success!");
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

const Footer = () => {
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

  const Icon = ({ section, isOpened }) => {
    const toggleSection = (newSection) => {
      switch (newSection) {
        case "logout":
          signOutClick();
          break;

        case "home":
          hideAllComponents();
          break;

        case "todolist":
          hideAllComponents();
          dispatch(setToDoList(!toDoList));
          break;

        case "note":
          hideAllComponents();
          dispatch(setNote(!note));
          break;

        case "blurting":
          hideAllComponents();
          dispatch(setBlurting(!blurting));
          break;

        case "flashcard":
          hideAllComponents();
          dispatch(setFlashCard(!flashCard));
          break;

        case "feynman":
          hideAllComponents();
          dispatch(setFeynman(!feynman));
          break;

        case "music":
          dispatch(setMusic(!music));
          dispatch(setPomodoro(false));
          break;

        case "search":
          hideAllComponents();
          dispatch(setSearch(!search));
          break;

        default:
          break;
      }
    };

    const getIcon = (section) => {
      switch (section) {
        case "home":
          return <BsCircle className="icon-size" />;
        case "todolist":
          return <FaClipboardList className="icon-size" />;
        case "note":
          return <FaRegStickyNote className="icon-size" />;
        case "blurting":
          return <BsFire className="icon-size" />;
        case "flashcard":
          return <BsCardHeading className="icon-size" />;
        case "feynman":
          return <FaChalkboardTeacher className="icon-size" />;
        case "music":
          return <BsSoundwave className="icon-size" />;
        case "search":
          return <BsSearch className="icon-size" />;
        case "logout":
          return <BiLogOutCircle className="icon-size" />;
        default:
          return null;
      }
    };

    return (
      <div
        className={
          "icon select-none transition ease-out " +
            (isOpened && "border-blue-500 border-4 shadow-md") || ""
        }
        onClick={() => toggleSection(section)}
      >
        {getIcon(section)}
      </div>
    );
  };

  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [isSettingClicked, setIsSettingClicked] = useState(false);

  return (
    <div className="footer-container bg-slate-50 ring-2 ring-slate-800 flex justify-center items-center border-solid border-x-0 border-b-0 w-screen h-13 lg:h-16 lg:rounded-ss-3xl lg:rounded-se-3xl">
      {/* large screen */}
      <div className="w-full justify-center items-center hidden lg:flex">
        <div className="absolute left-0 ml-3 flex">
          <div title="Home">
            <Icon section={"home"} />
          </div>
          <div title="Logout">
            <Icon section={"logout"} />
          </div>
        </div>
        <div className="w-screen lg:w-auto justify-evenly flex">
          <div title="To Do List">
            <Icon section={"todolist"} isOpened={toDoList} />
          </div>
          <div title="Notes">
            <Icon section={"note"} isOpened={note} />
          </div>
          <div title="Blurting">
            <Icon section={"blurting"} isOpened={blurting} />
          </div>
          <div title="Flashcard">
            <Icon section={"flashcard"} isOpened={flashCard} />
          </div>
          <div title="Feynman">
            <Icon section={"feynman"} isOpened={feynman} />
          </div>
          <div title="Search">
            <Icon section={"search"} isOpened={search} />
          </div>
        </div>
        <div className="absolute right-0 mr-3 flex">
          <div title="Music">
            <Icon section={"music"} />
          </div>
          <div
            title="Pomodoro"
            className="pomodoro"
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
                ? "absolute bottom-full mb-7 bg-slate-200 py-3 rounded-lg w-80 text-center z-50 visible"
                : "absolute bottom-full mb-7 bg-slate-200 py-3 rounded-lg w-80 text-center z-50 hidden"
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
                hideAllComponents();
                setIsBurgerClicked((e) => !e);
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
                  signOutClick()
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
            hideAllComponents();
            // setIsBurgerClicked(false)
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
