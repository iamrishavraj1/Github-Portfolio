import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Wrapper>
        <div className="container">
          <h1>Welcome to GitHub Portfolio</h1>
          <h2>
            Find the Next <span>Big Thing</span>
          </h2>
          <p>
            Welcome to GitHub Portfolio , your one-stop-shop for discovering the
            next big thing in technology. Our platform makes it easy for you to
            browse and search for the most innovative and promising projects and
            developers on GitHub. Whether you're a recruiter looking for top
            talent, or just a tech enthusiast on the hunt for the latest
            breakthroughs, our portfolio has something for everyone. Stay ahead
            of the curve by exploring our constantly updated selection of
            cutting-edge tech. Start browsing now and be the first to find the
            next big thing. In addition to browsing and searching for
            repositories, you can also view information such as the most popular
            language used in the repositories, the number of stars each
            repository has received, and the user's information such as their
            location and bio. Please note, this website uses GitHub's API to
            retrieve user data and has a
            <strong> request limit of 60 per hour</strong>. If you reach the
            limit, please wait some time before making more requests. Don't
            forget to check out our beautiful <strong>error</strong> page if you
            ever end up on a wrong URL. Thank you for visiting and happy
            browsing!
          </p>

          <button className="btn" onClick={loginWithRedirect}>
            login/ sign up
          </button>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  min-height: 96vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 1000px;
    text-align: center;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
  p {
    text-align: justify;
  }
  strong {
    color: var(--primary-clr-6);
  }

  span {
    color: var(--primary-clr-9);
    font-size: 3.5rem;
  }
`;
export default Login;
