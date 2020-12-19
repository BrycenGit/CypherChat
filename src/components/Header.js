import SignOut from "./SignOut";

const Header = () => {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <header>
      <h1 onClick={refreshPage}>👽👾🤖</h1>
      <SignOut />
    </header>
  );
};

export default Header;
