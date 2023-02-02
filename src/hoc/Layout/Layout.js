import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { cleanUserInfo } from "../../features/Authenticate/authenticateSlice";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const token = useSelector((state) => state.token.tokenId);
  const dispatch = useDispatch();
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();

  const logout = async () => {
    const success = await signOut();
    console.log(success);
    if (success) {
      alert("Logout succeed!");
      dispatch(cleanUserInfo());
      console.log("token layout", token);
      navigate("/");
    }
  };

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
      {console.log("token", token)}
      <Toolbar
        logoutCase={logout}
        isAuth={token ? true : false}
        sideDrawerClicked={sideDrawerToggleHandler}
      />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
