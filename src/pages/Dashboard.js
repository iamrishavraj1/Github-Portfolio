import { useContext } from "react";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { githubUser, githubFollowers, githubRepos } =
    useContext(GithubContext);
  // console.log(githubUser);
  // console.log(githubFollowers);
  // console.log(githubRepos);
  const { name } = githubUser;
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

export default Dashboard;
