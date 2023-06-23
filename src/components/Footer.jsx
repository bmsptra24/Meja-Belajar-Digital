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

  const Icon = ({ section, isOpened }) => {
    const toggleSection = (newSection) => {
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
          "icon select-none ring-2 ring-blue-950 " +
            (isOpened && "ring-blue-500 ring-4 shadow-md") || ""
        }
        onClick={() => toggleSection(section)}
      >
        {getIcon(section)}
      </div>
    );
  };

  return (
    <div className="footer-container bg-blue-400 ring-2 ring-slate-800 flex justify-center items-center border-solid border-x-0 border-b-0 w-screen h-16 absolute top-0 lg:top-auto bottom-auto lg:bottom-0 rounded-ss-3xl rounded-se-3xl">
      <div className="w-full flex justify-center items-center">
        <div className="absolute left-0 ml-3 flex">
          <div title="Home">
            <Icon section={"home"} />
          </div>
          <div title="Logout">
            <Icon section={"logout"} />
          </div>
        </div>
        <div className="flex">
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
        </div>
        <div className="absolute right-0 mr-3 flex">
          <div title="Search">
            <Icon section={"search"} isOpened={search} />
          </div>
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
            <div className="user-select-none">25:00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
