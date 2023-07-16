import ReactPlayer from "react-player";
import videoTutorial from "../Assets/videos/MBD-Tutorial.mp4";
import CloseButton from "./CloseButton";

const Help = () => {
  return (
    <>
      <div className="z-10 lg:h-auto lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-blue-300">
        <div className="w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-blue-400 ">
          <div className="relative flex flex-col items-center gap-2 pb-2 ">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold ml-1">Help</p>
              <CloseButton className={""}/>
            </div>

            <ReactPlayer
              url={videoTutorial}
              height={"auto"}
              width={"99%"}
              controls={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
