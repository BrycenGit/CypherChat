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
      <Box onClick={resetPage}>👽👾🤖</Box>
      <Box className="greenColor" onClick={toggleRequests}>
        🙋‍♀️{pendingRequestsCount}
      </Box>
      <Box>
        <ChatSelector
          currentUser={currentUser}
          handleSelectChat={handleSelectChat}
        />
      </Box>
      <Box>
        <NewFriendForm
          currentUser={currentUser}
          usersList={usersList}
          friendsList={friendsList}
        />
      </Box>
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
  min-height: 50px;
  .greenColor {
    color: Red;
  }
`;

const Box = styled.div`
  font-size: large;
  height: fit-content;
  /* width: 100%; */
  display: block;
`;
