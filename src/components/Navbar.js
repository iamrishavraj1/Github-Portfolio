import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && (
        <h4>
          Welcome,<strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--primary-clr-1);
  color: var(--primary-clr-3);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: var(--primary-clr-1);
    color: var(--primary-clr-3);
    border: 1px solid var(--primary-clr-3);
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.375rem 0.75rem;
    cursor: pointer;
  }
  button {
    &:hover {
      background: var(--primary-clr-7);
      color: var(--clr-primary-1);
    }
  }
`;

export default Navbar;
