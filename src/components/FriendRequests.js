import { useCollectionData } from "react-firebase-hooks/firestore";
import { isLoaded } from "react-redux-firebase";

const FriendRequests = (props) => {
  const { toggleRequests, currentUser } = props;

  const pendingRequestsRef = firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("pendingRequests");

  const acceptRequest = () => {
    alert("i accept you");
    toggleRequests();
  };

  const denyRequest = () => {
    alert("i deny you");
    toggleRequests();
  };

  const [pendingRequests] = useCollectionData(pendingRequestsRef);

  if (isLoaded(pendingRequests)) {
    return (
      <>
        <h1>Pending Requests</h1>
        {pendingRequests.map((user) => {
          <div>
            <p>
              {user.email}
              <span onClick={() => denyRequest()}>❌</span>
              <span onClick={() => acceptRequest()}>✔</span>
            </p>
          </div>;
        })}
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default FriendRequests;
