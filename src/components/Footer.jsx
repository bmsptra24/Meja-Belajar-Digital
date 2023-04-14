import "../styles/Icon.css";
import "../styles/Footer.css";

//Path icons
import todolistIcon from "../assets/icon/todolist.png";
import blurtingIcon from "../assets/icon/blurting.png";
import flashcardIcon from "../assets/icon/flashcard.png";
import feynmanIcon from "../assets/icon/feynman.png";
import homeIcon from "../assets/icon/home.png";
import searchIcon from "../assets/icon/search.png";
import musicIcon from "../assets/icon/music.png";

const Footer = ({
  setToDoList,
  toDoList,
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
  const Icon = ({ path, section }) => {
    return (
      <div
        className="icon"
        onClick={() => {
          // saat on click, dicari komponen mana yg terklik (dari sectionnya)
          switch (section) {
            case "home":
              // jika klik home maka semua state pengontrol di hide (false)
              setToDoList(false);
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
        <img src={path} />
      </div>
    );
  };

  return (
    <div className="footer-container">
      <div className="icon-container">
        <div className="left">
          <Icon path={homeIcon} section={"home"} />
        </div>
        <div className="center">
          <Icon path={todolistIcon} section={"todolist"} />
          <Icon path={blurtingIcon} section={"blurting"} />
          <Icon path={flashcardIcon} section={"flashcard"} />
          <Icon path={feynmanIcon} section={"feynman"} />
          <Icon path={musicIcon} section={"music"} />
        </div>
        <div className="right">
          <Icon path={searchIcon} section={"search"} />
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
            25:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
