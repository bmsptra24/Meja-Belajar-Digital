import { fetchDataRealtime } from "./Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { useEffect, useState } from "react";
import img1 from "../Assets/Wallpaper/img1.jpg";
import img2 from "../Assets/Wallpaper/img2.jpg";
import img3 from "../Assets/Wallpaper/img3.jpg";
import img4 from "../Assets/Wallpaper/img4.jpg";
import img5 from "../Assets/Wallpaper/img5.jpg";
import img6 from "../Assets/Wallpaper/img6.jpg";

export const images = [img1, img2, img3, img4, img5, img6];

export const Background = ({ className }) => {
  const [user] = useAuthState(auth);
  const [config, setConfig] = useState(0);
  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/config/background`, (snapshot) => {
        setConfig(snapshot);
      });
    }
  }, [user]);

  return <img src={images[config]} alt="background" className={className} />;
};
