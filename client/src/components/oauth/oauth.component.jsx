import React from "react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "../../firebase/firebase.config";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { signinSuccess } from "@/redux/features/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebase);

      const result = await signInWithPopup(auth, provider);
      console.log(
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );

      const res = await fetch(`${URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signinSuccess(data));
      router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          console.log("Account exists with different credential");
          break;
        case "auth/auth-domain-config-required":
          console.log("Auth domain config required");
          break;
        case "auth/cancelled-popup-request":
          console.log("Cancelled popup request");
          break;
        case "auth/credential-already-in-use":
          console.log("Credential already in use");
          break;
        case "auth/operation-not-allowed":
          console.log("Operation not allowed");
          break;
        case "auth/operation-not-supported-in-this-environment":
          console.log("Operation not supported in this environment");
          break;
        case "auth/popup-blocked":
          console.log("Popup blocked");
          break;
        case "auth/popup-closed-by-user":
          console.log("Popup closed by user");
          break;
        case "auth/unauthorized-domain":
          console.log("Unauthorized domain");
          break;
        case "auth/user-cancelled":
          console.log("User cancelled");
          break;
        case "auth/user-not-found":
          console.log("User not found");
          break;
        case "auth/user-token-expired":
          console.log("User token expired");
          break;
        case "auth/web-storage-unsupported":
          console.log("Web storage unsupported");
          break;
        default:
          console.log("Could not sign in with Google", error);
          break;
      }
    }
  };
  return <div onClick={handleGoogleClick}>Continue With Google</div>;
};

export default OAuth;
