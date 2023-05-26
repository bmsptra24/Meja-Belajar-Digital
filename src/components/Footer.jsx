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

const Footer = ({
  setToDoList,
  toDoList,
  setNote,
  note,
  setBlurting,
  blurting,
  setFlashCard,
  flashCard,
  setFeynman,
  feynman,
  setMusic,
  music,
  setSearch,
  search,
  setPomodoro,
  pomodoro,
}) => {
  const Icon = ({ section }) => {
    return (
      <div
        className="icon user-select-none"
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
      </div>
    );
  };

  return (
    <div className="footer-container">
      <div className="icon-container">
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
          <div
            className="pomodoro"
            onClick={() => {
              pomodoro === false ? setPomodoro(true) : setPomodoro(false);
              setToDoList(false);
              setBlurting(false);
              setFeynman(false);
              setFlashCard(false);
              setMusic(false);
              setSearch(false);
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
