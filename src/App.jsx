import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Setting from "./Pages/Setting";
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Home = lazy(() => import("./Pages/Home"));
// const Navigator = lazy(() => import("./Pages/Navigator"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="bg-loading d-flex vh-100 justify-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        }
      >
        {/* {user ? <Home /> : <Navigator />} */}
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
