import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState.showSideDrawer;
    });
  };
  return (
    <Aux>
      <Toolbar sideDrawerClicked={sideDrawerToggleHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
