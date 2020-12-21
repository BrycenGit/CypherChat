import SignOut from "./SignOut";
import NewFriendForm from "./NewFriendForm";
import ChatSelector from "./ChatSelector";
import styled from "styled-components";

const Header = (props) => {
  const {
    currentUser,
    friendsList,
    resetPage,
    pendingRequestsCount,
    toggleRequests,
    handleSelectChat,
    usersList,
  } = props;

  console.log(usersList);

  return (
    <NavBar>
      <h1 onClick={resetPage}>👽👾🤖</h1>
      <h1 onClick={toggleRequests}>🙋‍♀️{pendingRequestsCount}</h1>
      <ChatSelector
        currentUser={currentUser}
        handleSelectChat={handleSelectChat}
      />
      <NewFriendForm
        currentUser={currentUser}
        usersList={usersList}
        friendsList={friendsList}
      />
      <SignOut />
    </NavBar>
  );
};

export default Header;

const NavBar = styled.div`
  background-color: Red;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
