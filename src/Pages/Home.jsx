// inport module
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
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
import imgErrorHandling from "../assets/wallpaper/img1.jpg";
import unsplashApi from "../Store/Unsplash";

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

  if (!user) {
    navigate("/signin");
    return <></>;
  }

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
      <div className="absolute inset-0 z-0">
        <img
          // src={photos.length > 0 ? photos[0].urls.regular : imgErrorHandling} //for production
          src={"https://picsum.photos/1920/1080"} //for dev
          alt="wallpaper"
          className="w-full h-full"
        />
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
