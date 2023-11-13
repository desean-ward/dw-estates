"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const router = useRouter();

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push("/");
  //   }
  // }, [currentUser, router]);

  return <div>{currentUser ? children : null}</div>;
}
