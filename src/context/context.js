import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubrepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
  const [requests, setRequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: true, msg: "" });
  const [titleName, setTitleName] = useState(null);
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    setTitleName(response.data.name);
    console.log(response.data.name);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setGithubrepos(repos.value.data);
        }
        if (followers.status === status) {
          setGithubFollowers(followers.value.data);
        }
      });
    } else {
      toggleError(true, "There is no user with this username");
    }
    checkRequest();
    setIsLoading(false);
  };

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, "Sorry, You have exceeded your hourly limit...");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleError = (show, msg) => {
    setError({ show, msg });
  };
  useEffect(checkRequest, []);
  //TITLE CHANGE
  useEffect(() => {
    document.title = titleName
      ? `${githubUser.name}`
      : "GitHub Portfolio: Find the Next Big Thing";
  }, [titleName, githubUser.name]);

  return (
    <>
      <GithubContext.Provider
        value={{
          githubUser,
          githubFollowers,
          githubRepos,
          requests,
          error,
          searchGithubUser,
          isLoading,
        }}
      >
        {children}
      </GithubContext.Provider>
      ;
    </>
  );
};

export { GithubContext, GithubProvider };
