import React from "react";
import { toast } from "react-toastify";

const Toast = ({ message }) => {
  return toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  });
};

export default Toast;
