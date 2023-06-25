import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center flex-col items-center">
      {/* navbar */}
      <div className="w-full h-16 flex justify-center top-0 sticky bg-blue-500 z-10 text-blue-50">
        <div className="w-4/6 flex justify-between items-center">
          <p className="text-3xl font-black cursor-pointer hover:underline">
            MDB
          </p>
          <div className="flex justify-between gap-10">
            <p className="cursor-pointer hover:underline">Product</p>
            <p className="cursor-pointer hover:underline">About</p>
            <p className="cursor-pointer hover:underline">Contact</p>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Login
            </p>
          </div>
        </div>
      </div>

      {/* content 1 */}
      <div className="w-full flex justify-center bg-gradient-to-tr bg-blue-500 -mt-16 text-blue-50">
        <div className="w-4/6 h-screen flex justify-between items-center">
          <div className="w-1/2 flex flex-col gap-8 mt-7">
            <h1 className="font-bold text-5xl">Meja Belajar Digital</h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              veniam voluptatem sapiente, sit molestias autem illo. Voluptate
              ullam, suscipit temporibus fugit eum nulla enim earum autem
              soluta.
            </p>
            <div
              className="bg-blue-700 w-fit p-3 rounded-3xl cursor-pointer hover:bg-blue-600 hover:drop-shadow-2xl transition-all ease-in-out"
              onClick={() => navigate("/signup")}
            >
              Get started!
            </div>
          </div>
          <div>
            <div className="w-96 h-96 bg-slate-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-4/6 h-screen flex justify-center">a</div>
      </div>
    </div>
  );
};
export default LandingPage;
