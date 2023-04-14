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
    apiKey: 'AIzaSyBijZbCu2wicrtWe-_wruls44th-xFnnzI',
    authDomain: 'meja-belajar-digital.firebaseapp.com',
    projectId: 'meja-belajar-digital',
    storageBucket: 'meja-belajar-digital.appspot.com',
    messagingSenderId: '1050472517471',
    appId: '1:1050472517471:web:8c489f422f6d94576b70ea',
  }
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  // kalo user login maka ke home, selain itu ke signin
  return <section>{user ? <Home /> : <SignIn />}</section>
}

export default App
