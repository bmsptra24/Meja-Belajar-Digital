// inport module
import { useEffect } from "react";
import "../styles/Home.css";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import Note from "../components/Note";
import Blurting from "../components/Blurting";
import FlashCard from "../components/FlashCard";
import FeynMan from "../components/FeynMan";
import Music from "../components/Music";
import Search from "../components/Search";
import Pomodoro from "../components/Pomodoro";
import { useSelector } from "react-redux";

const Home = () => {
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
    document.body.style.zoom = "100%";
  }, []);

  return (
    <div className="home">
      {/* if the state is true so display component  */}
      {toDoList && <ToDoList />}
      {note && <Note />}
      {blurting && <Blurting />}
      {flashCard && <FlashCard />}
      {feynman && <FeynMan />}
      {music && <Music />}
      {search && <Search />}
      {pomodoro && <Pomodoro />}

      <Footer />
    </div>
  );
};

export default Home;
