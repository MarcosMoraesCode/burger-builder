import axios from "./../../axiosOrders";
import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = () => {
  let fetchedOrders = [];
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((response) => {
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
        console.log(err);
      });
  }, []);

  return <div>{orders}</div>;
};

export default withErrorHandler(Orders, axios);
