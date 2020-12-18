import { useFirestore } from "react-redux-firebase";

function NewUserForm(props) {
  const firestore = useFirestore();

  function addUserToFirestore(e) {
    e.preventDefault();
    const UsersRef = firestore.collection("users").doc(e.target.email.value);
    return UsersRef.set({
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      usename: e.target.username.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <>
      <h1>New User Form</h1>
      <form onSubmit={addUserToFirestore}>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" type="text" />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" type="text" />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" type="text" />
        <br />
        <label htmlFor="username">Username</label>
        <input name="username" type="text" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NewUserForm;
