import React, { useEffect, useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { cleanUserInfo } from "../../features/Authenticate/authenticateSlice";
import { restartIngredients } from "../../features/ingredients/ingredientsSlice";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();

  useEffect(() => {
    /*console.log(
      "Nova data: ",
      new Date().getTime(),
      "expirationDate: ",
      token.expirationDate
    );*/
    if (new Date().getTime() > token.expirationDate) {
      logout();
      dispatch(restartIngredients());
    }
  }, []);

  const logout = async () => {
    const success = await signOut();

    if (success) {
      console.log("Logout succeed!");
      dispatch(cleanUserInfo());

      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
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
      <Toolbar
        logoutCase={logout}
        isAuth={token.tokenId ? true : false}
        sideDrawerClicked={sideDrawerToggleHandler}
      />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
