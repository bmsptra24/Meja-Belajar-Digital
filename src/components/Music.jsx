import { useState } from "react";
import "../styles/Pomodoro.css";
import rainSound from "../assets/sound/rain-sound.mp3";
import fireSound from "../assets/sound/fireplace-sound.mp3";
import beachSound from "../assets/sound/beach-sound.mp3";
import forestSound from "../assets/sound/forest-sound.mp3";
import coffeeSound from "../assets/sound/cafe-sound.mp3";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (audioElement) => {
    audioElement.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    document.querySelectorAll("audio").forEach((el) => el.pause());
    setIsPlaying(false);
  };
  return (
    <div className="pop-up-size p-4 d-flex justify-content-between flex-column end-0 bottom-0 me-1">
      <div>
        <p className="fs-2 fw-bold border-bottom border-black border-3 d-flex justify-content-between">
          Sound
          {isPlaying ? (
            <BsFillPauseFill
              className="mt-2 fs-1"
              onClick={() => pauseAudio()}
            />
          ) : (
            <BsFillPlayFill className="mt-2 fs-1" opacity={"50%"} />
          )}
        </p>
      </div>
      <div className="h-75 w-100 blue-shadow rounded rounded-4 mb-3 pb-3 p-3 overflow-scroll">
        <audio id="rainSound" src={rainSound}></audio>
        <audio id="fireSound" src={fireSound}></audio>
        <audio id="beachSound" src={beachSound}></audio>
        <audio id="forestSound" src={forestSound}></audio>
        <audio id="coffeeSound" src={coffeeSound}></audio>

        <p
          className="bg-light rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("rainSound");
            playAudio(audioElement);
          }}
        >
          Rain
        </p>
        <p
          className="bg-light rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("fireSound");
            playAudio(audioElement);
          }}
        >
          Fire
        </p>
        <p
          className="bg-light rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("beachSound");
            playAudio(audioElement);
          }}
        >
          Beach
        </p>
        <p
          className="bg-light rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("forestSound");
            playAudio(audioElement);
          }}
        >
          Forest
        </p>
        <p
          className="bg-light rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("coffeeSound");
            playAudio(audioElement);
          }}
        >
          Coffee
        </p>
      </div>
    </div>
  );
};

export default Music;
