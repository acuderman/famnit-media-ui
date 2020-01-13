import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { categories, adminCategories } from "./data";
import { withRouter } from "react-router";
import * as axios from "axios";


import "./fonts.css";
import { API_BASE_URI } from "../../config";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root2: {
    display: "flex",
    position: "absolute",
    right: "15px",
    
  },
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  //flexGrow: 1,
  //padding: theme.spacing(3),
  //height: "90vh"
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "calc(100% - 24px)",
    display: 'block',
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(2)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState([]);
  const [force, setForce] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const [renderData, setRenderData] = React.useState([]) 

  const handleClick = (position, url) => {
    nestedOpen[position] =
      nestedOpen[position] === undefined ? true : !nestedOpen[position];
    setNestedOpen(nestedOpen);
    changeUrl(url);
    setForce(force + 1);
  };

  const changeUrl = url => {
    props.history.push(url);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URI}/categories`);

      setCategories(response.data);
      formatCategories(response.data)
    } catch (e) {
      // error
    }
  };

  const formatCategories = async (data) => {
    const mainCategories = data.filter(
      elt => elt.parent_category_id === null
    );
    const formattedMainCategories = [];
    await Promise.all(
      mainCategories.map(async elt => {
        const category = {
          category: elt.name,
          to: `/${elt.slug}`
        };
        category.children = await formatChildren(elt.id, elt.slug);
        formattedMainCategories.push(category)
      })
    );
      setRenderData(formattedMainCategories)
    
  };

  const formatChildren = async (categoryId, baseSlug) => {
    const children = [];
    const response = await axios.get(`${API_BASE_URI}/categories/${categoryId}/subcategories`)
    const data = response.data;
    data.forEach((sub) => {
      const category = {
        category: sub.name,
        to: `/${baseSlug}/${sub.slug}`,
        children: [],
      }
      children.push(category)
    })


    return children
  };

  const generateMenuItems = children => {
    const selectedCategories = props.signedIn ? adminCategories : renderData;
    const menuItems = [];
    const loopElements = children === undefined ? selectedCategories : children;
    loopElements.forEach((category, i) => {
      if (category.children.length === 0) {
        menuItems.push(
          <ListItem
            key={i}
            button
            onClick={() => {
              changeUrl(category.to);
            }}
          >
            <ListItemText primary={category.category} />
          </ListItem>
        );
      } else {
        menuItems.push(
          <span key={i}>
            <ListItem button onClick={() => handleClick(i, category.to)}>
              <ListItemText primary={category.category} />
              {nestedOpen[i] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={nestedOpen[i]}
              className={classes.nested}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {generateMenuItems(category.children)}
              </List>
            </Collapse>
          </span>
        );
      }
    });

    return menuItems;
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listRoot}
      >
        {generateMenuItems()}
      </List>
      { props.signedIn && <Divider />}
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listRoot}
      >
        {props.signedIn && generateMenuItems(renderData)}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
     
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:"#003366"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            style={{ fontFamily: "Russo One", fontSize: 25, cursor:"pointer"}}
            onClick={() => changeUrl("/")}
          >
            Famnit Tutorials
          </Typography>

          <div className={'about-icon'}>
              <Button style={{ color: "white", borderColor: "white" }}>
                ABOUT
              </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>

        {props.children}
      </main>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
