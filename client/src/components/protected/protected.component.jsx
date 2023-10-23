"use client";
import React from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  return <div>{currentUser ? children : router.push("/")}</div>;
};

export default ProtectedRoute;
