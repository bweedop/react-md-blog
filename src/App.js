import React from "react";
import { BrowserRouter, NavLink, Link, Route } from "react-router-dom";
import "./styles.css";
import Post from "./Components/Post";

const Promise = require("bluebird");

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

const UsersPage = () => <div>Users Page</div>;

class PrimaryLayout extends React.Component {
  state = {
    isLoaded: false,
    postPaths: null
  };

  componentDidMount() {
    const fs = Promise.promisifyAll(require("fs"));

    fs.readdirAsync("/src/posts/").then((files) => {
      this.setState({
        isLoaded: true,
        postPaths: files
      });
    });
  }

  render() {
    const { isLoaded, postPaths } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="primary-layout">
          <header>
            <h1>K. Bodie Weedop</h1>
            <NavLink to="/users">Users</NavLink>
            <ul>
              {postPaths.map((path) => (
                <li key={postPaths.indexOf(path)}>
                  <Link to={`/posts/${path.split(".")[0]}.html`}>
                    {path.split(".")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </header>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/users">
              <UsersPage />
            </Route>
            {postPaths.map((path) => (
              <Route
                key={postPaths.indexOf(path)}
                path={`/posts/${path.split(".")[0]}.html`}
              >
                <Post postPath={`/src/posts/${path}`} />
              </Route>
            ))}
          </main>
        </div>
      );
    }
  }
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    </div>
  );
}
