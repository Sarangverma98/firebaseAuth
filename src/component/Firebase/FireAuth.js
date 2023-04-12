import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBraVzTbq8Wc2rvD8wb1rXLKwxpa2w5lcU",
    authDomain: "fir-auth-f59e8.firebaseapp.com",
    projectId: "fir-auth-f59e8",
    storageBucket: "fir-auth-f59e8.appspot.com",
    messagingSenderId: "149572523719",
    appId: "1:149572523719:web:6a6a756ba0cfa2e86010e2",
    measurementId: "G-J7ZJFBG74E"
};

firebase.initializeApp(firebaseConfig);

const FireAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        alert("Please enter valid email or password");
      });
  };

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert("User doesn't exist or incorrect email/password");
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello World</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <label htmlFor="">New Users Please Sign Up</label>
          <br />
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password (atleast 6 digits)"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
          <br />
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default FireAuth;

