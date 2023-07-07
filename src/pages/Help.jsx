import ReactPlayer from "react-player";
import videoTutorial from "../assets/videos/MBD-Tutorial.mp4";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="App pattern-box">
      <AiFillHome
        className="absolute top-10 left-10 text-4xl text-slate-950/30 cursor-pointer hover:text-slate-950/70 transition-all ease-in-out"
        onClick={() => {
          navigate("/home");
        }}
      />
      <div className="w-full h-auto lg:h-full p-5 lg:p-20 flex justify-center items-center">
        <ReactPlayer
          url={videoTutorial}
          height={"100%"}
          width={"auto"}
          controls={true}
        />
      </div>
    </div>
  );
};
export default Help;
