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
    <div className="w-72 h-96 rounded-3xl border-2 border-slate-800 absolute bg-blue-400 z-20 p-4 flex justify-between flex-col lg:right-0 bottom-16 mr-1">
      <div className="items-center flex justify-between">
        <p className="font-bold text-2xl ml-2">Sound</p>
        {isPlaying ? (
          <BsFillPauseFill
            className="mt-2 text-2xl"
            onClick={() => pauseAudio()}
          />
        ) : (
          <BsFillPlayFill className="opacity-50 text-3xl" />
        )}
      </div>
      <div className="rounded-xl bg-blue-200 mb-3 pb-3 p-3  grow mt-5 flex flex-col gap-2">
        <audio id="rainSound" src={rainSound}></audio>
        <audio id="fireSound" src={fireSound}></audio>
        <audio id="beachSound" src={beachSound}></audio>
        <audio id="forestSound" src={forestSound}></audio>
        <audio id="coffeeSound" src={coffeeSound}></audio>

        <p
          className="bg-blue-50 hover:bg-slate-300 rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("rainSound");
            playAudio(audioElement);
          }}
        >
          Rain
        </p>
        <p
          className="bg-blue-50 hover:bg-slate-300 rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("fireSound");
            playAudio(audioElement);
          }}
        >
          Fire
        </p>
        <p
          className="bg-blue-50 hover:bg-slate-300 rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("beachSound");
            playAudio(audioElement);
          }}
        >
          Beach
        </p>
        <p
          className="bg-blue-50 hover:bg-slate-300 rounded py-1 px-2 cursor-pointer"
          onClick={() => {
            document.querySelectorAll("audio").forEach((el) => el.pause());
            const audioElement = document.getElementById("forestSound");
            playAudio(audioElement);
          }}
        >
          Forest
        </p>
        <p
          className="bg-blue-50 hover:bg-slate-300 rounded py-1 px-2 cursor-pointer"
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
