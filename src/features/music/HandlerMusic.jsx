import rainSound from "../../assets/sound/rain-sound.mp3";
import fireSound from "../../assets/sound/fireplace-sound.mp3";
import beachSound from "../../assets/sound/beach-sound.mp3";
import forestSound from "../../assets/sound/forest-sound.mp3";
import cafeSound from "../../assets/sound/cafe-sound.mp3";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Store/Firebase";
import { updateData } from "../../Store/Database";
import { useSelector } from "react-redux";
import { fetchDataRealtime } from "../../Store/Database";
import { useEffect, useState } from "react";

export const HandlerMusic = () => {
  const [user] = useAuthState(auth);
  const [musicLog, setMusicLog] = useState("");
  const { playAudio } = useSelector((state) => state.music);

  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/music/log`, (snapshot) => {
      setMusicLog(snapshot);
    });
  }, [user.uid]);

  useEffect(() => {
    if (playAudio === "stop") {
      return document.querySelectorAll("audio").forEach((el) => el.pause());
    }
    if (playAudio === "playLog") {
      document.querySelectorAll("audio").forEach((el) => el.pause());
      document.getElementById(musicLog).play();
      return;
    }
    document.querySelectorAll("audio").forEach((el) => el.pause());
    document.getElementById(playAudio).play();
    updateData(["users/" + user.uid + "/music/log"], playAudio);
  }, [playAudio, user, musicLog]);

  return (
    <>
      <audio id="rainSound" src={rainSound}></audio>
      <audio id="fireSound" src={fireSound}></audio>
      <audio id="beachSound" src={beachSound}></audio>
      <audio id="forestSound" src={forestSound}></audio>
      <audio id="cafeSound" src={cafeSound}></audio>
    </>
  );
};
