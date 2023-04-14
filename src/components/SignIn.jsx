import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (password === "") {
      return alert("Passwprd Empty!");
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Login success");
        // ...
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
          <h2 className="fw-bold ">Login Account</h2>
          <p className="p-4 mt-n4">
            Hey, enter your detail to get sign in to your account!
          </p>
          <div className="mt-n4 form-loginpage">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
          <button className="btn mt-n4 btn-sign-up" onClick={() => {}}>
            Don't have any account!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
