import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFB from "../assets/icon/fb_logo.png";
import logoGoogle from "../assets/icon/google_logo.png";
import { signIn } from "../Store/Firebase";
import "../styles/SignIn.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="flex lg:w-4/5 xl:w-3/5 lg:h-3/4 lg:shadow-2xl rounded-3xl">
        <div className="h-screen lg:h-auto w-screen lg:w-1/2 p-4 px-7 pb-7 flex flex-col justify-evenly lg:justify-between bg-blue-50 lg:rounded-s-3xl">
          <div className="flex justify-center my-7">
            <p className="font-black text-4xl">Login</p>
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              className="placeholder:text-slate-500 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="placeholder:text-slate-500 mt-4 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="transition ease-in-out hover:to-blue-600 hover:from-blue-400 bg-gradient-to-l from-cyan-400 to-blue-500 h-12 rounded mt-4"
              onClick={() => {
                signIn(email, password);
                navigate("/home");
              }}
            >
              Login
            </button>
            <div className="flex justify-center mt-4 text-sm">
              <p>{"Don't have an account?"}</p>
              <button
                className="transition ease-in-out hover:text-blue-600 ml-2 text-blue-500"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-4 grow">
              <div className="grow">
                <hr className="h-px my-4 bg-slate-300 border-0" />
              </div>
              <p className="mx-2 mt-1 text-slate-500">Or</p>
              <div className="grow">
                <hr className="h-px my-4 bg-slate-300 border-0" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="transition ease-in-out hover:bg-slate-200 relative bg-blue-50 h-12 rounded border-2 border-slate-300 flex justify-center items-center">
              <img
                src={logoGoogle}
                alt="Logo Google"
                className="absolute w-5 left-0 ml-4"
              />
              Login with Google
            </button>
            <button className="transition ease-in-out hover:bg-fb-600 bg-fb-500 relative text-blue-50 h-12 rounded border mt-4 mb-1 flex justify-center items-center">
              <div className="absolute w-7 left-0 ml-3 bg-blue-50 rounded-full p-1">
                <img src={logoFB} alt="Logo Google" className="rounded-full" />
              </div>
              Login with Facebook
            </button>
          </div>
        </div>
        <div className="lg:flex hidden w-1/2 bg-gradient-to-bl from-cyan-500 to-blue-500 justify-center items-center rounded-e-3xl">
          <div className="px-7 flex flex-col text-center text-blue-50">
            <p className="font-black text-4xl mb-5">Meja Belajar Digital</p>
            <p className="px-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              ut consequatur vero excepturi officia repellendus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
