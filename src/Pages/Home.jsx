// inport module
<<<<<<< Updated upstream
import { useState } from "react";
=======
>>>>>>> Stashed changes
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
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
<<<<<<< Updated upstream
  // const auth = getAuth();
  // const [user] = useAuthState(auth);

  // auth.onAuthStateChanged(() => {
  //   if (user) {
  //     if (!user.emailVerified) {
  //       console.log("email status : " + user.emailVerified);
  //       return auth.signOut();
  //     }
  //   }
  // });

  // declaration state switch display component
  const [toDoList, setToDoList] = useState(false);
  const [note, setNote] = useState(false);
  const [blurting, setBlurting] = useState(false);
  const [flashCard, setFlashCard] = useState(false);
  const [feynman, setFeynman] = useState(false);
  const [music, setMusic] = useState(false);
  const [search, setSearch] = useState(false);
  const [pomodoro, setPomodoro] = useState(false);

=======
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

>>>>>>> Stashed changes
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
