import { useFirestore, isLoaded } from "react-redux-firebase";
import styled from "styled-components";
const FriendRequests = (props) => {
  const firestore = useFirestore();
  const { currentUser, pendingRequests } = props;

  const usersRef = firestore.collection("users");

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
    usersRef.doc(id).collection("friends").doc(currentUser.email).set({
      email: currentUser.email,
      id: currentUser.uid,
    });
    pendingRequestsRef
      .doc(userEmail)
      .delete()
      .then(() => {
        console.log("deleted from requests");
      })
      .catch((error) => {
        console.error("error requests", error);
      });
    usersRef
      .doc(id)
      .collection("sentRequests")
      .doc(currentUser.email)
      .delete()
      .then(() => {
        console.log("succesfully deleted");
      })
      .catch((error) => {
        console.error("error jerror", error);
      });
  };

  const denyRequest = (userEmail, id) => {
    alert("i deny you");
    pendingRequestsRef
      .doc(userEmail)
      .delete()
      .then(() => {
        console.log("deleted from requests");
      })
      .catch((error) => {
        console.error("error requests", error);
      });
    usersRef
      .doc(id)
      .collection("sentRequests")
      .doc(currentUser.email)
      .delete()
      .then(() => {
        console.log("succesfully deleted");
      })
      .catch((error) => {
        console.error("error jerror", error);
      });
  };

  if (isLoaded(pendingRequests)) {
    console.log(pendingRequests.length);
    return (
      <RequestsPage>
        <h1 className="title">
          Pending Requests <span id="red">{pendingRequests.length}</span>
        </h1>
        {pendingRequests.map((user) => {
          return (
            <div className="request" key={user.email}>
              <div>{user.email}</div>
              <div>
                <span onClick={() => denyRequest(user.email, user.id)}>❌</span>
                <span onClick={() => acceptRequest(user.email, user.id)}>
                  ✔
                </span>
              </div>
            </div>
          );
        })}
      </RequestsPage>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default FriendRequests;

const RequestsPage = styled.div`
  width: 750px;
  .title {
    color: #f8f8f8;
  }
  .request {
    display: flex;
    background-color: #f8f8f8;
    padding: 5px 9px;
    border-radius: 4px;
    justify-content: space-between;
    width: 350px;
  }
  #red {
    color: #ff1654;
  }
`;
