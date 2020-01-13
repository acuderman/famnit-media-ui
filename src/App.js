import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Cookie from "js-cookie";
import ResponsiveDrawer from "./components/side-menu";
import CategoryPage from "./pages/user/category-page";
import SubCategoryPage from "./pages/user/subcategory-page";
import AdminPage from "./pages/admin/admin-page";
import UploadPage from "./pages/admin/upload-page";
import VideosPage from "./pages/admin/videos";
import DeleteCategoryPage from "./pages/admin/delete-category";
import CategoriesAddAdminPage from "./pages/admin/add-category";
import CategoriesEditAdminPage from "./pages/admin/edit-category";
import EditVideoPage from "./pages/admin/edit-video";
import UserVideosPage from "./pages/user/user-page-videos";
import { verifyAccessToken } from "./helpers/authentication";
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
          path="/:category/:sub_category/:video_id"
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
          <CategoriesEditAdminPage />
        </Route>
        <Route path="/categories/delete">
          <DeleteCategoryPage />
        </Route>
        <Route path="/videos">
          <VideosPage />
        </Route>
        <Route
          path="/edit/:id"
          render={props => <EditVideoPage match={props.match} />}
        />
                <Route path="/admin">
          <AdminPage
            signedIn={signedIn}
            onSignOutResponse={onSignOutResponse}
            onSignInResponse={onSignInResponse}
          />
        </Route>
        <Route
          path="/:category/:sub_category/:video_id"
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
    <div className='home-iframe'>
      <iframe frameBorder={0} style = {{ width: '100%', height: '100%' }} src={`${BASE_URL}/home`} />
      </div>
  );
}
