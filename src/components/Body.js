import MessagesControl from "./MessagesControl";
import SignIn from "./SignIn";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Body = () => {
  const auth = firebase.auth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      {/* <Header /> */}
      <section>
        {user ? (
          <MessagesControl user={user} />
        ) : loading ? (
          <p></p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
};

export default Body;
