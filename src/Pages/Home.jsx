// inport module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../store/Firebase";
import ToDoList from "../components/ToDoList";
import Note from "../components/Note";
import Blurting from "../components/Blurting";
import FlashCard from "../components/FlashCard";
import FeynMan from "../components/FeynMan";
import Music from "../components/Music";
import Search from "../components/Search";
import Pomodoro from "../components/Pomodoro";
import { HandlerMusic } from "../features/music/HandlerMusic";
import { HandlerPomodoro } from "../features/pomodoro/HandlerPomodoro";
import { useSelector } from "react-redux";
import dumyImage2 from "../assets/wallpaper/dumyImage2.jpg";
// import dumyVideo from "../assets/wallpaper/dumyVideo.mp4";
import unsplashApi from "../store/Unsplash";
import ReactPlayer from "react-player";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [photos, setPhotos] = useState([]);
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

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const fetchPhotos = async () => {
    try {
      const response = await unsplashApi.get("/photos/random", {
        params: {
          count: 5,
        },
      });

      setPhotos(response.data);
    } catch (error) {
      console.log("Error fetching photos from Unsplash:", error);
    }
  };

  return (
    <div className="home bg-slate-100 flex flex-col justify-between relative">
      <HandlerMusic />
      <HandlerPomodoro />
      <div
        className={
          "absolute inset-0 z-0 " +
          (toDoList || note || blurting || flashCard || feynman
            ? "hidden lg:block"
            : "")
        }
      >
        <img
          // src={photos.length > 0 ? photos[0].urls.regular : dumyImage1} //for production
          src={"https://picsum.photos/1920/1080"} //for dev
          alt="wallpaper"
          className="w-full h-full hidden lg:block"
        />
        <img
          // src={photos.length > 0 ? photos[0].urls.regular : dumyImage2} //for production
          src={"https://picsum.photos/1080/1920"} //for dev
          alt="wallpaper"
          className="w-full h-full block lg:hidden"
        />
        {/* <ReactPlayer url="<https://www.youtube.com/watch?v=ysz5S6PUM-U>" height={'100%'} width={'100%'} muted/> */}
      </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
