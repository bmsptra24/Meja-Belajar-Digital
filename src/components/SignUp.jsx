import "../styles/SignUp.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { updateData } from "../Store/Database";
import validator from "validator";
import { auth } from "../Store/Firebase";

const SignUp = ({ setNavigator }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // create new account user
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // write user data to database
        // writeUserData(user.uid, name, email);
        updateData("users/" + user.uid, {
          email: email,
          feynman: null,
          moduls: null,
          notes: null,
          search: null,
          tasks: null,
          username: name,
          pomodoro: {
            pomodoroDuration: 25,
            shortBreak: 5,
            longBreak: 15,
          },
        });
        // sending email verification
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          alert("An email verification link has been sent to " + user.email);
        });

        // Log out first, cause have to verificated first
        auth.signOut();
        setNavigator(1);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };

  return (
    <div className="App">
      <div className="belakang">
        <div className="login-container rounded-3">
          <h2 className="fw-bold fs-1">Sign Up Account</h2>
          <p className="p-4 mt-n4">
            Hey, enter your detail to get sign up to your account!
          </p>
          <input
            type="text"
            className="form-control form-loginpage mt-n4"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control form-loginpage mt-2"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control form-loginpage mt-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control form-loginpage mt-2"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              if (!validator.isEmpty(name, { ignore_whitespace: true })) {
                if (validator.isEmail(email)) {
                  if (password === confirmPassword) {
                    createUser();
                  } else {
                    alert("Cek kembali password anda!");
                  }
                } else {
                  alert("Email not valid!");
                }
              } else {
                alert("Nama tidak boleh kosong! ");
              }
            }}
          >
            Sign Up
          </button>
          <button
            className="btn login-button-in-signup"
            onClick={() => {
              setNavigator(1);
            }}
          >
            I have an account!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
