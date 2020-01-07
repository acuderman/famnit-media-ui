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
  Theme
} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { categories, adminCategories } from "./data";
import { withRouter } from "react-router";
import "./fonts.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root2: {
    display: "flex",
    position: "absolute",
    right: "15px"
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
    zIndex: theme.zIndex.drawer + 1
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
    height:'90vh'
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

  const generateMenuItems = children => {
    const selectedCategories = props.signedIn ? adminCategories : categories;
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
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
            style={{ fontFamily: "Russo One", fontSize: 25, cursor: "pointer" }}
            onClick={() => changeUrl("/")}
          >
            Famnit Tutorials
          </Typography>

          <div className={classes.root2}>
            <ButtonGroup
              variant="text"
              color="white"
              aria-label="text primary button group"
            >
              <Button style={{ color: "white", borderColor: "white" }}>
                SLO
              </Button>
              <Button style={{ color: "white", borderColor: "white" }}>
                ENG
              </Button>
            </ButtonGroup>
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
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
