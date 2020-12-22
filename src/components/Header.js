import SignOut from "./SignOut";
import NewFriendForm from "./NewFriendForm";
import ChatSelector from "./ChatSelector";
import styled from "styled-components";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

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
    <div>
      {/* <NavBar>
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
      </NavBar> */}
      <NavContainer>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand onClick={resetPage}>CypherChat</Navbar.Brand>
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
            <SignOut className="box" />
          </Nav>
          {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
          <NewFriendForm
            className="box"
            currentUser={currentUser}
            usersList={usersList}
            friendsList={friendsList}
          />
        </Navbar>
      </NavContainer>
    </div>
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
  #count {
    background-color: white;
  }
`;
const NavContainer = styled.div`
  #count {
    background-color: white;
    color: black;
    padding: 3px 8px;
    border-radius: 4px;
  }
`;
