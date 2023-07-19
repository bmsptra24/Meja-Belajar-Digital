import { useState } from "react";
import img1 from "../Assets/Wallpaper/img1.jpg";
import img2 from "../Assets/Wallpaper/img2.jpg";
import img3 from "../Assets/Wallpaper/img3.jpg";
import img4 from "../Assets/Wallpaper/img4.jpg";
import img5 from "../Assets/Wallpaper/img5.jpg";
import img6 from "../Assets/Wallpaper/img6.jpg";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";

export const images = [img1, img2, img3, img4, img5, img6];

export const Background = ({ className }) => {
  const { config } = useSelector((state) => state.database);
  const [loading, setLoading] = useState(true);
  console.log(loading);
  return (
    <>
      <div
        className={`${
          !loading ? "invisible" : "visible"
        } w-full h-full absolute bg-slate-400/50 animate-pulse flex justify-center items-center z-20`}
      >
        <ImSpinner2 className="text-5xl text-slate-50 animate-spin" />
      </div>
      <img
        loading="lazy"
        src={images[config?.background]}
        alt="background"
        className={`${className} ${
          loading ? "invisible" : "visible"
        } hidden lg:block`}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};
