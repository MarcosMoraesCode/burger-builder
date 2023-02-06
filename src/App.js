import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";

function App() {
  const token = useSelector((state) => state.token.tokenId);
  const LazyAuth = React.lazy(() => import("./containers/Auth/Auth"));
  const LazyOrders = React.lazy(() => import("./containers/Orders/Orders"));
  const LazyCheckout = React.lazy(() =>
    import("./containers/Checkout/Checkout")
  );

  let routes = (
    <>
      <Route path="/" exact element={<BurguerBuilder />} />
      <Route path="/sign-in" exact element={<LazyAuth />} />
    </>
  );
  if (token) {
    routes = (
      <>
        <Route path="/" exact element={<BurguerBuilder />} />
        <Route path="/checkout/*" exact element={<LazyCheckout />} />
        <Route path="/orders" exact element={<LazyOrders />} />
        <Route path="/logout" exact element={<Logout />} />
      </>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{routes}</Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
