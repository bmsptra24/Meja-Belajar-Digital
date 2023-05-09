import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//key
const firebaseConfig = {
  apiKey: 'AIzaSyBijZbCu2wicrtWe-_wruls44th-xFnnzI',
  authDomain: 'meja-belajar-digital.firebaseapp.com',
  projectId: 'meja-belajar-digital',
  storageBucket: 'meja-belajar-digital.appspot.com',
  messagingSenderId: '1050472517471',
  appId: '1:1050472517471:web:8c489f422f6d94576b70ea',
  databaseURL: 'https://meja-belajar-digital-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
