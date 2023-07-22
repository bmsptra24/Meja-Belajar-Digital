import { Toasts } from "../Components/Toasts";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { updateData } from "../Store/Database";
import validator from "validator";
import { auth } from "../Store/Firebase";
import mbd from "../Assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastsSwitch, setToastsSwitch] = useState(-1);
  const navigate = useNavigate();

  document.querySelector("title").innerHTML = "Signup - Meja Belajar Digital";

  // create new account user
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            console.log("User created!");
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
          });

        // write user data to database
        updateData("users/" + user.uid, {
          email: email,
          feynman: null,
          moduls: null,
          notes: null,
          search: null,
          tasks: null,
          music: { log: "rainSound" },
          username: name,
          pomodoro: {
            pomodoroDuration: 25,
            shortBreak: 5,
            longBreak: 15,
          },
          config: {
            background: 0,
            color: "blue",
            taskbar: {
              blurting: true,
              feynman: true,
              flashcard: true,
              notes: false,
              todolist: false,
            },
            theme: "light",
          },
        });
        // sending email verification
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          setToastsSwitch(0);
          setTimeout(() => {
            setToastsSwitch(-1);
          }, 7000);
        });

        // Log out first, cause have to verificated first
        auth.signOut();
        navigate("/help");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };

  return (
    <div className="App">
      <div className="absolute w-full h-full pattern-box"></div>
      {toastsSwitch === 0 && (
        <Toasts
          category={"success"}
          message={"An email verification has been sent to your account!"}
        />
      )}
      <div className="flex lg:h-3/4 lg:w-4/5 xl:w-3/5 lg:shadow-2xl rounded-3xl z-10">
        <div className="lg:flex hidden w-1/2 bg-gradient-to-bl from-cyan-500 to-blue-500 justify-center items-center rounded-s-3xl">
          <div className="px-7 flex flex-col text-center text-blue-50 h-full justify-center ">
            <div className="relative flex flex-col items-center mt-5 h-8/10">
              <img
                src={mbd}
                alt="Logo MBD"
                className="w-10/12 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <div>
                <p className="font-bold text-4xl">Meja Belajar Digital</p>
                <p className="px-7">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ducimus ut consequatur vero excepturi officia repellendus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen lg:h-auto w-screen lg:w-1/2 p-4 px-7 pb-7 flex flex-col justify-evenly lg:justify-between bg-blue-50 lg:rounded-e-3xl">
          <div className="flex justify-center my-7">
            <p className="font-bold text-4xl text-slate-600">Signup</p>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className="placeholder:text-slate-500 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="placeholder:text-slate-500 mt-4 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2"
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
            <input
              type="password"
              className="placeholder:text-slate-500 mt-4 h-12 rounded px-3 bg-slate-200 focus:outline-none focus:ring-slate-300 focus:ring-2"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="hover:to-blue-600 hover:from-blue-400 bg-gradient-to-l from-cyan-400 to-blue-500 h-12 rounded mt-4"
            onClick={() => {
              if (!validator.isEmpty(name, { ignore_whitespace: true })) {
                if (validator.isEmail(email)) {
                  if (password === confirmPassword) {
                    createUser();
                  } else {
                    <Toasts
                      category={"success"}
                      message={"Cek kembali password anda!"}
                    />;
                  }
                } else {
                  alert("Email not valid!");
                }
              } else {
                alert("Nama tidak boleh kosong!");
              }
            }}
          >
            Sign Up
          </button>
          <div className="flex justify-center text-sm">
            <p>{"I have an account!"}</p>
            <button
              className="ml-2 transition ease-in-out hover:text-blue-600 text-blue-500"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
