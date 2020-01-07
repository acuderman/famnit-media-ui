import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Cookie from "js-cookie";
import ResponsiveDrawer from "./components/side-menu";
import CategoryPage from "./pages/user/category-page";
import SubCategoryPage from "./pages/user/subcategory-page";
import HomePage from "./pages/home-page";
import AdminPage from "./pages/admin/admin-page";
import UploadPage from "./pages/admin/upload-page";
import VideosPage from "./pages/admin/videos";
import CategoriesAddAdminPage from "./pages/admin/categories-add";
import CategoriesEditPage from "./pages/admin/categories-edit";
import EditVideoPage from "./pages/admin/edit-video";
import UserVideosPage from "./pages/user/user-page-videos";
import { getAccessToken, verifyAccessToken } from "./helpers/authentication";
import { BASE_URL } from "./config";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    checkAccessToken();
  }, []);

  async function checkAccessToken() {
    const accessToken = Cookie.get("token");
    if (accessToken !== undefined) {
      try {
        await verifyAccessToken(accessToken);
        setSignedIn(true);
      } catch (e) {
        Cookie.remove("token");
        setSignedIn(false);
      }
    }
    setTokenChecked(true);
  }

  const onSignInResponse = async data => {
    const { tokenObj } = data;
    const token = await getAccessToken(
      tokenObj.id_token,
      tokenObj.access_token
    );
    Cookie.set("token", token);
    setSignedIn(true);
    window.location.href = `${BASE_URL}/videos`;
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <AdminPage
            signedIn={signedIn}
            onSignOutResponse={onSignOutResponse}
            onSignInResponse={onSignInResponse}
          />
        </Route>
        <Route
          path="/watch/:video_id"
          render={props => <UserVideosPage match={props.match} />}
        />
        <Route
          exact
          path="/:category"
          render={props => <CategoryPage match={props.match} />}
        />
        <Route
          exact
          path="/:category/:sub_category"
          render={props => <SubCategoryPage match={props.match} />}
        />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/admin">
          <AdminPage
            signedIn={signedIn}
            onSignOutResponse={onSignOutResponse}
            onSignInResponse={onSignInResponse}
          />
        </Route>
        <Route path="/upload">
          <UploadPage />
        </Route>
        <Route path="/categories/add">
          <CategoriesAddAdminPage />
        </Route>
        <Route path="/categories/edit">
          <CategoriesEditPage />
        </Route>
        <Route path="/categories/remove">
          <VideosPage />
        </Route>
        <Route path="/videos">
          <VideosPage />
        </Route>
        <Route
          path="/edit/:id"
          render={props => <EditVideoPage match={props.match} />}
        />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
  let render = <span />;

  if (tokenChecked) {
    render = (
      <Router>
        <ResponsiveDrawer signedIn={signedIn}>{routes}</ResponsiveDrawer>
      </Router>
    );
  }

  /*if(document.location.href.endsWith('/admin')) {
    render = 
    <Router>
      {routes}
    </Router>
  }*/

  return render;
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

const SubCategory = props => {
  const { sub_category, category } = props.match.params;

  return (
    <h2>
      Category:{category}, Sub category: {sub_category}
    </h2>
  );
};

const Category = props => {
  const { category } = props.match.params;

  return <h2>Category:{category}</h2>;
};

function Admin() {
  return <h2>Admin</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
