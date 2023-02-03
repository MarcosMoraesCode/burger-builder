import axios from "./../../axiosOrders";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { addOrder, fetchOrders } from "../../features/orders/ordersSlice";
import classes from "./Orders.css";

const Orders = () => {
  const orders = useSelector((state) => state.initialOrders.orders);
  const token = useSelector((state) => state.token.tokenId);
  const userId = useSelector((state) => state.token.userId);
  //const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  let ordersContainer = <Spinner />;

  useEffect(() => {
    dispatch(fetchOrders({ token: token, userId: userId }));
  }, []);

  if (orders) {
    console.log(orders.length);
    let ordersSize = orders.length;
    switch (ordersSize) {
      case 0:
        console.log("caso 0");
        ordersContainer = (
          <div>
            <p>You don't have any order delivered yet!</p>
          </div>
        );
        break;
      default:
        console.log("caso 1");
        let updatedOrders = orders.map((order, index) => {
          return (
            <Order
              key={index}
              salad={order.ingredients.salad}
              bacon={order.ingredients.bacon}
              meat={order.ingredients.meat}
              cheese={order.ingredients.cheese}
              price={order.price}
            />
          );
        });
        ordersContainer = updatedOrders;
        break;
    }
  }

  return <div className={classes.Orders}>{ordersContainer}</div>;
};

export default withErrorHandler(Orders, axios);
