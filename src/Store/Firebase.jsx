import { initializeApp } from "firebase/app";
import { signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";

//key
const firebaseConfig = {
  apiKey: "AIzaSyBijZbCu2wicrtWe-_wruls44th-xFnnzI",
  authDomain: "meja-belajar-digital.firebaseapp.com",
  projectId: "meja-belajar-digital",
  storageBucket: "meja-belajar-digital.appspot.com",
  messagingSenderId: "1050472517471",
  appId: "1:1050472517471:web:8c489f422f6d94576b70ea",
  databaseURL: "https://meja-belajar-digital-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signOutBtn = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

export const signIn = (email, password) => {
  if (password === "") {
    return alert("Password Empty!");
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      if (user) {
        if (!user.emailVerified) {
          auth.signOut();
          return alert("Email is not verified");
        } else {
          // alert("Login success");
         }
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
};
