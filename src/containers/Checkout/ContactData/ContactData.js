import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

const ContactData = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
  });

  return (
    <div className={classes.ContactData}>
      <h4>Entry your contact data</h4>
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="zipCode"
          placeholder="Z-code"
        />
        <Button btnType="Success">ORDER</Button>
      </form>
    </div>
  );
};

export default ContactData;
