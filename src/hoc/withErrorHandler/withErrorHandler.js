import React, { useEffect, useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    //const [reqInterceptor, setReqInterceptor] = useState(null);
    //const [resInterceptor, setResInterceptor] = useState(null);

    let teste1 = axios.interceptors.request.use(
      (req) => {
        // console.log(req);
        setError(null);
        return req;
      },
      (error) => {
        setError(error);
        return console.log("O erro de requisição tá aqui:", error);
      }
    );
    //setReqInterceptor(teste1);
    let teste2 = axios.interceptors.response.use(
      (res) => {
        //console.log(res);
        return res;
      },
      (error) => {
        setError(error);
        return console.log("O erro de resposta tá aqui:", error);
      }
    );

    //setResInterceptor(teste2);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
