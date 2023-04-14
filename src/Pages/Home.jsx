// inport module
import { useState } from "react";
import "../styles/Home.css";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import Blurting from "../components/Blurting";
import FlashCard from "../components/FlashCard";
import FeynMan from "../components/FeynMan";
import Music from "../components/Music";
import Search from "../components/Search";
import Pomodoro from "../components/Pomodoro";

const Home = () => {
  // declaration state
  const [toDoList, setToDoList] = useState(false);
  const [blurting, setBlurting] = useState(false);
  const [flashCard, setFlashCard] = useState(false);
  const [feynman, setFeynman] = useState(false);
  const [music, setMusic] = useState(false);
  const [search, setSearch] = useState(false);
  const [pomodoro, setPomodoro] = useState(false);

  return (
    <div className="home">
      {/* if the state is true so display component  */}
      {toDoList === true && <ToDoList />}
      {blurting === true && <Blurting />}
      {flashCard === true && <FlashCard />}
      {feynman === true && <FeynMan />}
      {music === true && <Music />}
      {search === true && <Search />}
      {pomodoro === true && <Pomodoro />}

      <Footer
        //passing state to child
        setToDoList={setToDoList}
        toDoList={toDoList}
        setBlurting={setBlurting}
        blurting={blurting}
        flashCard={flashCard}
        setFlashCard={setFlashCard}
        feynman={feynman}
        setFeynman={setFeynman}
        music={music}
        setMusic={setMusic}
        search={search}
        setSearch={setSearch}
        pomodoro={pomodoro}
        setPomodoro={setPomodoro}
      />
    </div>
  );
};

export default Home;
