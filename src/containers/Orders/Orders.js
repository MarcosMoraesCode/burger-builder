import axios from "./../../axiosOrders";
import React, { Fragment, useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = () => {
  let fetchedOrders = [];
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  let ordersContainer = orders;
  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders.json")
      .then((response) => {
        setLoading(false);
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        let orders = fetchedOrders.map((order) => {
          return (
            <Order
              key={order.id}
              salad={order.ingredients.salad}
              bacon={order.ingredients.bacon}
              meat={order.ingredients.meat}
              cheese={order.ingredients.cheese}
              price={order.price}
            />
          );
        });
        setOrders(orders);
        // console.log(orders);
      })
      .catch((err) => {
        setLoading(false);
        //console.log("passou em orders");
      });
  }, []);

  ordersContainer = orders;

  if (loading) {
    ordersContainer = <Spinner />;
  }

  return <div>{ordersContainer}</div>;
};

export default withErrorHandler(Orders, axios);
