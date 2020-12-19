import "../App.css";
import React, { useState } from "react";
import MessagesControl from "./MessagesControl.js";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const auth = firebase.auth();
  const [user, loading] = useAuthState(auth);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="App">
      <header>
        <h1 onClick={refreshPage}>👽👾🤖</h1>
        <SignOut />
      </header>
      <section>
        {user ? (
          <MessagesControl user={user} />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

export default App;
