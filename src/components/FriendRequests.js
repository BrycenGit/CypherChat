import { useCollectionData } from "react-firebase-hooks/firestore";
import { useFirestore, isLoaded } from "react-redux-firebase";

const FriendRequests = (props) => {
  const { toggleRequests, currentUser, pendingRequests } = props;

  const acceptRequest = () => {
    alert("i accept you");
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
                <span onClick={() => acceptRequest()}>✔</span>
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
