// inport module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "../Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import ToDoList from "../Components/ToDoList";
import Note from "../Components/Note";
import Blurting from "../Components/Blurting";
import FlashCard from "../Components/FlashCard";
import FeynMan from "../Components/FeynMan";
import Music from "../Components/Music";
import Search from "../Components/Search";
import Pomodoro from "../Components/Pomodoro";
import { HandlerMusic } from "../Features/music/HandlerMusic";
import { HandlerPomodoro } from "../Features/pomodoro/HandlerPomodoro";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import videoTutorial from "../Assets/videos/MBD-Tutorial.mp4";
import Menu from "../Components/Menu";
import Setting from "../Components/Setting";
import { Background } from "../Store/Background";
import FetchData from "../Store/FetchData";
import Help from "../Components/Help";
import { Quote } from "../Components/Quote";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [photos, setPhotos] = useState([]);
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
    setting,
    help,
  } = useSelector((state) => state.home);

  document.querySelector("title").innerHTML = "Meja Belajar Digital";

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return (
    <div className="home bg-slate-100 flex flex-col justify-between relative font-roboto text-slate-950">
      <HandlerMusic />
      <HandlerPomodoro />
      <FetchData />
      <Quote />

      <div
        className={
          "absolute inset-0 z-0 " +
          (toDoList || note || blurting || flashCard || feynman
            ? "hidden lg:block"
            : "")
        }
      >
        <TbHelpSquareRoundedFilled
          className="absolute top-3 right-3 text-4xl text-slate-50/30 cursor-pointer hover:text-slate-50/70 transition-all ease-in-out"
          onClick={() => {
            navigate("/help");
          }}
          title="Help"
        />
        <Background className="w-full h-full" />
        <img
          // src={photos.length > 0 ? photos[0].urls.regular : dumyImage2} //for production
          src={"https://picsum.photos/1080/1920"} //for dev
          alt="wallpaper"
          className="w-full h-full block lg:hidden"
        />
      </div>

      {/* <div className="absolute left-10 top-10 w-2/6 h-80 px-5 bg-slate-50 rounded-3xl flex justify-center items-center">
        <ReactPlayer
          url={videoTutorial}
          height={"auto"}
          width={"100%"}
          controls={true}
          playing={true}
        />
      </div> */}

      {setting && <Setting />}
      {menu && <Menu />}

      <div className="grow flex justify-center items-center w-full overflow-hidden">
        {/* if the state is true so display component  */}
        {toDoList && <ToDoList />}
        {note && <Note />}
        {blurting && <Blurting />}
        {flashCard && <FlashCard />}
        {feynman && <FeynMan />}
        {music && <Music />}
        {search && <Search />}
        {pomodoro && <Pomodoro />}
        {help && <Help />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
