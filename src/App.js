import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  //key
  const firebaseConfig = {
    apiKey: 'AIzaSyANfxb3MTLBsJTPiBPmB216rxdDSMNjtjE',
    authDomain: 'todolist-6d439.firebaseapp.com',
    projectId: 'todolist-6d439',
    storageBucket: 'todolist-6d439.appspot.com',
    messagingSenderId: '9887849788',
    appId: '1:9887849788:web:800342db8b6a14ff8a1239',
  }
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  // kalo user login maka ke home, selain itu ke signin
  return <section>{user ? <Home /> : <SignIn />}</section>
}

export default App
