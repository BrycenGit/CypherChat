import "../App.css";
import React, { useState } from "react";
import MessagesControl from "./MessagesControl.js";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function App() {
  const auth = firebase.auth();
  const [user, loading, error] = useAuthState(auth);

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
          <img src="https://bit.ly/2LPpEt0" alt="loading" />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

export default App;
