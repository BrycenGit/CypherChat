import { useFirestore } from 'react-redux-firebase'
import firebase from "../firebase";


function SignIn(props) {
 
  const firestore = useFirestore();


  function doSignUp(e) {
    e.preventDefault();
    const auth = firebase.auth()
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return firestore.collection('users').doc(cred.user.uid).set(
        {
          email,
          username,
          firstName,
          lastName,
        }
      )
    }).then(()=> {
      console.log('succesful sign up')
      console.log(auth.currentUser)
    }).catch((error)=> {
      console.log(error.message)
      
    });
  }

  function doSignIn(event) {
    event.preventDefault();
    const auth = firebase.auth()
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth.signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
      console.log(auth.currentUser)
    }).catch(function(error) {
      console.log(error.message);
    });
  }

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
      <h1>New User Form</h1>
      <form onSubmit={doSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" type="text" />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" type="text" />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" type="text" />
        <br />
        <label htmlFor="password">password</label>
        <input name="password" type="password" />
        <br />
        <label htmlFor="username">Username</label>
        <input name="username" type="text" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" />
        <br />
        <label htmlFor="password">password</label>
        <input name="password" type="password" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}



export default SignIn;
