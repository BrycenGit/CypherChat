import firebase from "../firebase";
import NewFriendForm from "./NewFriendForm";
import ChatSelector from "./ChatSelector";
import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";

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

  function doSignOut() {
    const auth = firebase.auth();
    auth
      .signOut()
      .then(function () {
        console.log("Successfully signed out!");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  return (
    <div>
      <NavContainer>
        <Navbar expand="lg" className="width" bg="dark" variant="dark">
          <Navbar.Brand onClick={resetPage}>CypherChat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={resetPage}>Home</Nav.Link>

              <ChatSelector
                className="box"
                currentUser={currentUser}
                handleSelectChat={handleSelectChat}
              />
              <Nav.Link onClick={toggleRequests}>
                Requests <span id="count">{pendingRequestsCount}</span>
              </Nav.Link>
              <Nav.Link onClick={doSignOut}>Sign Out</Nav.Link>
            </Nav>
            <Nav>
              <NewFriendForm
                className="box"
                currentUser={currentUser}
                usersList={usersList}
                friendsList={friendsList}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </NavContainer>
    </div>
  );
};

export default Header;

const NavContainer = styled.div`
  #count {
    background-color: white;
    color: #6c757d;
    padding: 3px 8px;
    border-radius: 4px;
  }
  .width {
    /* min-width: 900px; */
  }
`;
