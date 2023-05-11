import './App.css'
import SignInAndSignUp from './Pages/SignInAndSignUp'
import Home from './Pages/Home'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Store/Firebase'

function App() {
  // state
  // const [dataUser, setDataUser] = useState()

  const [user] = useAuthState(auth)

  // useEffect(() => {
  //   if (user) {
  //     getDataUser()
  //   }
  // }, user)
  // kalo user login maka ke home, selain itu ke signin
  return <section>{user ? <Home /> : <SignInAndSignUp />}</section>
}

export default App
