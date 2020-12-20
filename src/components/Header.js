import SignOut from "./SignOut";
import NewFriendForm from "./NewFriendForm";
import ChatSelector from "./ChatSelector";

const Header = (props) => {
  const {
    currentUser,
    usersList,
    resetPage,
    pendingRequestsCount,
    toggleRequests,
    handleSelectChat,
  } = props;

  return (
    <header>
      <h1 onClick={resetPage}>👽👾🤖</h1>
      <h1 onClick={toggleRequests}>🙋‍♀️{pendingRequestsCount}</h1>
      <ChatSelector
        currentUser={currentUser}
        handleSelectChat={handleSelectChat}
      />
      <NewFriendForm currentUser={currentUser} usersList={usersList} />
      <SignOut />
    </header>
  );
};

export default Header;
