"use client";
import SignIn from "@/components/signin/signin.component";

import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  return (
    <div>
      <h1>Welcome {currentUser ? currentUser.username : null}</h1>
    </div>
  );
}
