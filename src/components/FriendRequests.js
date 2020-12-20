import { useCollectionData } from "react-firebase-hooks/firestore";
import { useFirestore, isLoaded } from "react-redux-firebase";

const FriendRequests = (props) => {
  const firestore = useFirestore();
  const { toggleRequests, currentUser, pendingRequests } = props;

  const friendsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("friends");

  const pendingRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const acceptRequest = (userEmail, id) => {
    alert("i accept you");
    friendsRef.doc(userEmail).set({
      email: userEmail,
      id: id,
    });
    pendingRequestsRef
      .doc(userEmail)
      .delete()
      .then(() => {
        console.log("succesfully deleted");
      })
      .catch((error) => {
        console.error("error jerror", error);
      });
    toggleRequests();
  };

  const denyRequest = () => {
    alert("i deny you");
    toggleRequests();
  };

  if (isLoaded(pendingRequests)) {
    console.log(pendingRequests);
    return (
      <>
        <h1>Pending Requests</h1>
        {pendingRequests.map((user) => {
          return (
            <div key={user.email}>
              <p>
                {user.email}
                <span onClick={() => denyRequest()}>❌</span>
                <span onClick={() => acceptRequest(user.email, user.id)}>
                  ✔
                </span>
              </p>
            </div>
          );
        })}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default FriendRequests;
