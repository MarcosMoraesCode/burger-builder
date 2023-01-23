import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" exact element={<BurguerBuilder />} />
            <Route path="/checkout" exact element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
