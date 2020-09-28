import React from "react";
import { Alert } from "react-bootstrap";

const AlertCustomer = ({ type, text }) => {
  return <Alert variant={`${type}`} > ${text}</Alert>;
};

export default AlertCustomer;
