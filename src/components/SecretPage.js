const SecretPage = (props) => {
  const { toggleSecret } = props;

  return (
    <div>
      <h1>SECRET</h1>
      <button onClick={toggleSecret}>home</button>
    </div>
  );
};

export default SecretPage;
