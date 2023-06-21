import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Store/Firebase";
import { useEffect, lazy, Suspense } from "react";
const Home = lazy(() => import("./Pages/Home"));
<<<<<<< Updated upstream
const SignInAndSignUp = lazy(() => import("./Pages/SignInAndSignUp"));
=======
const Navigator = lazy(() => import("./Pages/Navigator"));

>>>>>>> Stashed changes
function App() {
  useEffect(() => {
    document.body.style.zoom = "100%";
  }, []);

  const [user] = useAuthState(auth);

  // kalo user login maka ke home, selain itu ke signin
  return (
    <>
      <Suspense
        fallback={
          <div className="bg-loading d-flex vh-100 justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        }
      >
        {user ? <Home /> : <Navigator />}
      </Suspense>
    </>
  );
}
export default App;
