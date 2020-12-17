import firebase from "../firebase";

function SignOut() {
 
  function doSignOut() {
    const auth = firebase.auth()
    auth.signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  
  return (
    <>
      <h1>Sign Out</h1>
        <button onClick={doSignOut}>Sign out</button>
    </>
  )
}



export default SignOut;