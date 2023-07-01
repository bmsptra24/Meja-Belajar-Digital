import { useNavigate } from "react-router-dom";
import mbd from "../assets/logo/mbd.png";

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
              “Meja Belajar Digital” adalah aplikasi yang dapat memudahkan siswa
              dalam belajar mandiri secara efektif dengan memanfaatkan teknologi
              yang ada, dengan menggunakan beberapa metode belajar.
            </p>
            <div
              className="bg-blue-700 w-fit p-3 rounded-3xl cursor-pointer hover:bg-blue-600 hover:drop-shadow-2xl transition-all ease-in-out"
              onClick={() => navigate("/signup")}
            >
              Get started!
            </div>
          </div>
          <div>
            <div className="w-12/12 h-12/12 rounded-full flex justify-center items-center">
              <img src={mbd} alt="Logo MBD" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-blue-400">
        <div className="w-4/6 h-screen flex justify-center">Product</div>
      </div>
      <div className="w-full flex justify-center bg-blue-300">
        <div className="w-4/6 h-screen flex justify-center">About</div>
      </div>
      <div className="w-full flex justify-center bg-blue-200">
        <div className="w-4/6 h-screen flex justify-center">Contact</div>
      </div>
      <div className="w-full flex justify-center bg-blue-100">
        <div className="w-4/6 h-screen flex justify-center">Footer</div>
      </div>
    </div>
  );
};
export default LandingPage;
