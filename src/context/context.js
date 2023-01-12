import React, { useState, useEffect } from "react";
import axios from "axios";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState("");
  const [githubFollowers, setGithubFollowers] = useState("");
  const [githubRepos, setGithubrepos] = useState("");
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchGithubUser = async (user) => {
    setIsLoading(true);

    //FETCHING DATA FROM API
    const response = await axios(`${rootUrl}/users/iamrishavraj1`).catch(
      (error) => {
        console.log(error);
      }
    );

    //IF RESPONSE IS SUCESS
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      //PARALLEL API CALLING
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=10`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setGithubrepos(repos.value.data);
          }
          if (followers.status === status) {
            setGithubFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          console.log("NO REQUEST LEFT");
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    searchGithubUser();
    checkRequest();
  }, []);

  return (
    <>
      <GithubContext.Provider
        value={{
          githubUser,
          githubFollowers,
          githubRepos,
          requests,
          searchGithubUser,
          isLoading,
        }}
      >
        {children}
      </GithubContext.Provider>
    </>
  );
};

export { GithubContext, GithubProvider };
