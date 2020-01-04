import React, { useEffect, useState, useParams } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as axios from "axios";
import * as Cookie from "js-cookie";
import ResponsiveDrawer from './components/side-menu'
import AdminPage from './pages/admin-page'
import {BASE_URL} from './config'
import { useHistory } from "react-router-dom";
import CategoryPage from "./pages/category-page";

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

  const onSignInResponse = async (data) => {
    Cookie.set("token", data.tokenObj.access_token);
    setSignedIn(true)
    window.location="localhost:3000"
  };

  const onSignOutResponse = async (data) => {
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
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/admin">
          <AdminPage signedIn={signedIn} onSignOutResponse={onSignOutResponse} onSignInResponse={onSignInResponse}  />
        </Route>

        <Route 
        exact path="/:category">
            <CategoryPage/>
        </Route>
        <Route 
        exact path="/:category/:sub_category"
        render={(props)=> <SubCategory match={props.match} />} />
      
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/admin">
          <AdminPage signedIn={signedIn} onSignOutResponse={onSignOutResponse} onSignInResponse={onSignInResponse}  />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }

  let render =
    <Router>
        <ResponsiveDrawer >
      {routes}
      </ResponsiveDrawer>
    </Router>

  /*if(document.location.href.endsWith('/admin')) {
    render = 
    <Router>
      {routes}
    </Router>
  }*/

  return (
    render
  );
}

function Home() {
  return (<div>
    <h2>Home</h2>
    <Link to='/admin'>Admin</Link>
    </div>);
}

function About() {
  return <h2>About</h2>;
}

const SubCategory = (props) => {
 const { sub_category, category } = props.match.params

return <h2>Category:{category}, Sub category: {sub_category}</h2>;
}

const Category = (props) => {
  const { category } = props.match.params
 
 return <h2>Category:{category}</h2>;
 }

function Admin() {
  return <h2>Admin</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
