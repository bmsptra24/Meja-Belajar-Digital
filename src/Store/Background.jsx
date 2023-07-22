import { useState } from "react";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { Wallpaper } from "../../Configuration";
import ReactPlayer from "react-player";

export const Background = ({ className }) => {
  const { config } = useSelector((state) => state.database);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  return (
    <>
      <div
        className={`${
          !loading ? "invisible" : "visible"
        } w-full h-full absolute bg-slate-400/50 animate-pulse flex justify-center items-center z-20`}
      >
        <ImSpinner2 className="text-5xl text-slate-50 animate-spin" />
      </div>
      {Wallpaper[config?.background]?.id === "img" && (
        <img
          loading="lazy"
          src={Wallpaper[config?.background]?.src}
          alt="background"
          className={`${className} ${
            loading ? "invisible" : "visible"
          } hidden lg:block`}
          onLoad={() => setLoading(false)}
        />
      )}
      {Wallpaper[config?.background]?.id === "video" && (
        <div className="w-full h-full relative">
          {start && <div className="h-full w-full absolute z-10"></div>}
          <div className="w-screen h-screen absolute">
            <ReactPlayer
              url={Wallpaper[config?.background]?.src}
              height={"100%"}
              width={"100%"}
              controls={false}
              playing={true}
              loop={true}
              onReady={() => setLoading(false)}
              onPlay={() => setStart(true)}
              muted
            />
          </div>
        </div>
      )}
    </>
  );
};
