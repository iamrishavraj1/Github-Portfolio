import styled from "styled-components";
const Login = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <h1>Hello, Welcome</h1>
          <button className="btn">sign in / sign up</button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
`;
export default Login;
