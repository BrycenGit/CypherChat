import SignOut from "./SignOut";
import NewFriendForm from "./NewFriendForm";

const Header = (props) => {
  const {
    currentUser,
    usersList,
    resetPage,
    pendingRequestsCount,
    toggleRequests,
  } = props;

  return (
    <header>
      <h1 onClick={resetPage}>👽👾🤖</h1>
      <h1 onClick={toggleRequests}>🙋‍♀️{pendingRequestsCount}</h1>
      <NewFriendForm currentUser={currentUser} usersList={usersList} />
      <SignOut />
    </header>
  );
};

export default Header;
