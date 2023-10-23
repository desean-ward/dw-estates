"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const router = useRouter();

  return <div>{currentUser ? children : router.push("/")}</div>;
}
