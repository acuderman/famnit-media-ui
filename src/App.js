import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleAuth from "./components/admin";
import * as axios from "axios";
import * as Cookie from "js-cookie";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    checkAccessToken();
  }, []);
  

  async function checkAccessToken() {
    const accessToken = Cookie.get("token");
    if (accessToken !== undefined) {
      try {
        await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
        );
        setSignedIn(true);
      } catch (e) {
        Cookie.remove("token");
        setSignedIn(false);
      }
    }
  }

  const onSignInResponse = async data => {
    Cookie.set("token", data.tokenObj.access_token);
    setSignedIn(true);
  };

  const onSignOutResponse = async data => {
    Cookie.remove("token");
    setSignedIn(false);
  };

  let routes;
  if (!signedIn) {
    routes = (
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/admin">
          <About />
        </Route>
      </Switch>
    );
  }

  return (
    <Router>
      <GoogleAuth
        signedIn={signedIn}
        onSignOutResponse={onSignOutResponse}
        onSignInResponse={onSignInResponse}
      />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        {routes}
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
