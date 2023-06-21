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
import "../styles/Icon.css";
import "../styles/Footer.css";
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

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

  const Icon = ({ section }) => {
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
        className="icon user-select-none"
<<<<<<< Updated upstream
        onClick={() => {
          // saat on click, dicari komponen mana yg terklik (dari sectionnya)
          switch (section) {
            case "home":
              // jika klik home maka semua state pengontrol di hide (false)
              setToDoList(false);
              setNote(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "todolist":
              toDoList === false ? setToDoList(true) : setToDoList(false);
              // hide component sebelumnya
              setNote(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "note":
              note === false ? setNote(true) : setNote(false);
              // hide component sebelumnya
              setToDoList(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "blurting":
              blurting === false ? setBlurting(true) : setBlurting(false);
              // hide component sebelumnya
              setToDoList(false);
              setNote(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "flashcard":
              flashCard === false ? setFlashCard(true) : setFlashCard(false);
              // hide component sebelumnya
              setToDoList(false);
              setNote(false);
              setBlurting(false);
              setFeynman(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "feynman":
              feynman === false ? setFeynman(true) : setFeynman(false);
              // hide component sebelumnya
              setToDoList(false);
              setNote(false);
              setBlurting(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "music":
              music === false ? setMusic(true) : setMusic(false);
              // hide component sebelumnya
              setToDoList(false);
              setNote(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setSearch(false);
              setPomodoro(false);
              break;

            case "search":
              search === false ? setSearch(true) : setSearch(false);
              // hide component sebelumnya
              setToDoList(false);
              setNote(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setPomodoro(false);
              break;

            default:
              break;
          }
        }}
      >
        {section === "home" ? (
          <BsCircle className="icon-size" />
        ) : section === "todolist" ? (
          <FaClipboardList className="icon-size" />
        ) : section === "note" ? (
          <FaRegStickyNote className="icon-size" />
        ) : section === "blurting" ? (
          <BsFire className="icon-size" />
        ) : section === "flashcard" ? (
          <BsCardHeading className="icon-size" />
        ) : section === "feynman" ? (
          <FaChalkboardTeacher className="icon-size" />
        ) : section === "music" ? (
          <BsSoundwave className="icon-size" />
        ) : section === "search" ? (
          <BsSearch className="icon-size" />
        ) : null}
=======
        onClick={() => toggleSection(section)}
      >
        {getIcon(section)}
>>>>>>> Stashed changes
      </div>
    );
  };

  return (
    <div className="footer-container">
      <div className="icon-container">
<<<<<<< Updated upstream
        <div className="left">
          <Icon section={"home"} />
        </div>
        <div className="center">
          <Icon section={"todolist"} />
          <Icon section={"note"} />
          <Icon section={"blurting"} />
          <Icon section={"flashcard"} />
          <Icon section={"feynman"} />
          <Icon section={"music"} />
        </div>
        <div className="right">
          <Icon section={"search"} />
=======
        <div className="left d-flex">
          <div title="Home">
            <Icon section={"home"} />
          </div>
          <div title="Logout">
            <Icon section={"logout"} />
          </div>
        </div>
        <div className="center">
          <div title="To Do List">
            <Icon section={"todolist"} />
          </div>
          <div title="Notes">
            <Icon section={"note"} />
          </div>
          <div title="Blurting">
            <Icon section={"blurting"} />
          </div>
          <div title="Flashcard">
            <Icon section={"flashcard"} />
          </div>
          <div title="Feynman">
            <Icon section={"feynman"} />
          </div>
        </div>
        <div className="right">
          <div title="Search">
            <Icon section={"search"} />
          </div>
          <div title="Music">
            <Icon section={"music"} />
          </div>
>>>>>>> Stashed changes
          <div
            title="Pomodoro"
            className="pomodoro"
            onClick={() => {
<<<<<<< Updated upstream
              pomodoro === false ? setPomodoro(true) : setPomodoro(false);
              setToDoList(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
=======
              dispatch(setPomodoro(!pomodoro));
              dispatch(setMusic(false));
>>>>>>> Stashed changes
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
