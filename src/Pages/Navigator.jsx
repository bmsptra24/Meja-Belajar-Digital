import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import LandingPage from "./LandingPage";

const Pages = () => {
  // state for switch bitween sign in and sign up
  const [navigator, setNavigator] = useState(0);

  // state 1 = sign in, 2 = sign up
  if (navigator === 0) {
    document.body.style.zoom = "75%";
    return <LandingPage setNavigator={setNavigator} />;
  }
  if (navigator === 1) {
    document.body.style.zoom = "100%";
    return <SignIn setNavigator={setNavigator} />;
  }
  if (navigator === 2) {
    document.body.style.zoom = "100%";
    return <SignUp setNavigator={setNavigator} />;
  }
};

export default Pages;
