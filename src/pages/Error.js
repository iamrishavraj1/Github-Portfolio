import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
const Error = () => {
  const { pathname } = useLocation();
  const color = "--clr-grey-6";
  return (
    <>
      <Wrapper>
        <div>
          <h1>
            404, That's an <span>error</span>
          </h1>
          <h4>
            The requested Page <span> {pathname}</span> was not found on this
            server. <span style={{ color }}>That's all we know.</span>
          </h4>
          <Link to="/" className="btn">
            Back to home
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  h1 {
    font-size: 6rem;
  }
  span {
    color: var(--primary-clr-6);
  }
`;

export default Error;
