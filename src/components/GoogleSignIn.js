import firebase from "../firebase";
import { useFirestore } from "react-redux-firebase";

const GoogleSignIn = () => {
  const firestore = useFirestore();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // const token = result.credential.accessToken;
        const user = result.user;
        console.log(user.uid);
        console.log(user.email);
        console.log(user.displayName);
        return firestore.collection("users").doc(user.uid).set({
          email: user.email,
          displayName: user.displayName,
          id: user.uid,
        });
      });
  };

  return <button onClick={signInWithGoogle}>Google</button>;
};

export default GoogleSignIn;
