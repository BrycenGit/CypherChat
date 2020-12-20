import SignOut from "./SignOut";

const Header = (props) => {
  const { resetPage, pendingRequestsCount, toggleRequests } = props;

  return (
    <header>
      <h1 onClick={resetPage}>👽👾🤖</h1>
      <h1 onClick={toggleRequests}>🙋‍♀️{pendingRequestsCount}</h1>
      <SignOut />
    </header>
  );
};

export default Header;
