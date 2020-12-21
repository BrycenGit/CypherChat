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
      <div className="box" onClick={resetPage}>
        👽👾🤖
      </div>
      <div className="greenColor box" onClick={toggleRequests}>
        🙋‍♀️{pendingRequestsCount}
      </div>

      <ChatSelector
        className="box"
        currentUser={currentUser}
        handleSelectChat={handleSelectChat}
      />

      <NewFriendForm
        className="box"
        currentUser={currentUser}
        usersList={usersList}
        friendsList={friendsList}
      />

      <SignOut className="box" />
    </NavBar>
  );
};

export default Header;

const NavBar = styled.div`
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  .greenColor {
    color: black;
  }
  .box {
    font-size: large;
    height: fit-content;
  }
`;
