import { useFirestore } from "react-redux-firebase";
import firebase from "../firebase";
import styled from "styled-components";
import { useState } from "react";

function SignIn() {
  const firestore = useFirestore();

  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  function doSignUp(e) {
    e.preventDefault();
    const auth = firebase.auth();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return firestore.collection("users").doc(cred.user.uid).set({
          email,
          username,
          firstName,
          lastName,
          id: cred.user.uid,
        });
      })
      .then(() => {
        console.log("succesful sign up");
        console.log(auth.currentUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const auth = firebase.auth();
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Successfully signed in!");
        console.log(auth.currentUser);
      })
      .catch(function (error) {
        console.log(error.message);
        return error;
      });
  }
  if (signUp) {
    return (
      <>
        <Container>
          <p>New User Form</p>
          <SignInForm onSubmit={doSignUp}>
            <Label htmlFor="firstName">First Name</Label>
            <input name="firstName" type="text" />
            <br />
            <Label htmlFor="lastName">Last Name</Label>
            <input name="lastName" type="text" />
            <br />
            <Label htmlFor="email">Email</Label>
            <input name="email" type="text" />
            <br />
            <Label htmlFor="password">password</Label>
            <input name="password" type="password" />
            <br />
            <Label htmlFor="username">Username</Label>
            <input name="username" type="text" />
            <br />
            <button type="submit">Submit</button>
          </SignInForm>
          <button onClick={toggleSignUp}>Back</button>
        </Container>
      </>
    );
  } else if (signIn) {
    return (
      <>
        <Container>
          <p>Sign In Hi</p>
          <SignInForm onSubmit={doSignIn}>
            <Label htmlFor="email">Email</Label>
            <input name="email" type="text" />
            <br />
            <Label htmlFor="password">password</Label>
            <input name="password" type="password" />
            <br />
            <button type="submit">Submit</button>
          </SignInForm>
          <button onClick={toggleSignIn}>Back</button>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <ButtonContainer>
          <div>
            <h1>CypherChat</h1>
          </div>
          <div>
            <button class btn btn-info onClick={toggleSignIn}>
              Sign In
            </button>

            <button onClick={toggleSignUp}>Sign Up</button>
          </div>
        </ButtonContainer>
      </>
    );
  }
}

export default SignIn;

const Container = styled.div`
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  /* border-radius: 8px; */
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
  padding: 15px;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
  /* border-radius: 8px; */
`;

const SignInForm = styled.form``;

const Label = styled.label`
  width: 100px;
`;
