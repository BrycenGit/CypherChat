import styled from "styled-components";
const HomePage = () => {
  return (
    <Home>
      <h1>Welcome To CypherChat!</h1>
      <p>
        At Cypher chat we take your privacy seriously. The private conversations
        you have between yourself and whom ever you choose to converse with will
        be encrypted and decypted clientside so that your private conversations
        aren't floating freely in the cloud for wandering eyes to see.
      </p>
    </Home>
  );
};

const Home = styled.div`
  width: 700px;
  color: #dbdbdb;
`;

export default HomePage;
