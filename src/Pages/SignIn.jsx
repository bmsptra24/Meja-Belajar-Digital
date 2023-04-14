import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Pages = () => {
  const [signInOrSignUp, setSignInOrSignUp] = useState(false);
  return signInOrSignUp === false ? (
    <SignIn setSignInOrSignUp={setSignInOrSignUp} />
  ) : (
    <SignUp setSignInOrSignUp={setSignInOrSignUp} />
  );
};

export default Pages;
