"use client";
import { useSelector } from "react-redux";

const selectUser = () => {
  const user = useSelector((state) => state.persistedReducer.user);
  console.log("user", user);
  return user;
};

export { selectUser };
