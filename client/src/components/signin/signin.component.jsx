"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../../redux/features/user/userSlice";

import {
  SignInButton,
  SignInContainer,
  SignInForm,
  SignInInput,
  SignUpLink,
  SignUpSection,
} from "./signin.styles";
import OAuth from "../oauth/oauth.component";

const SignIn = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { error, loading, currentUser } = useSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormFields({ ...formFields, [id]: value });
    error && error.length && dispatch(signinFailure(null));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formFields.email !== "" && formFields.password !== "") {
      try {
        dispatch(signinStart());

        const res = await fetch(`${URL}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formFields),
        });

        const data = await res.json();

        // If the user is not signed successfully, display the error message
        if (data.success === false) {
          console.log("data", data);
          dispatch(signinFailure(data.message));
          return;
        }

        // If the user is signed in successfully, redirect to the login page
        dispatch(signinSuccess(data));
        router.push("/");
        return;
      } catch (error) {
        dispatch(signinFailure(error.message));
        return;
      }

      setFormFields(defaultFormFields);
    } else {
      dispatch(signinFailure("Please fill in all fields"));
    }
  };

  return (
    <SignInContainer>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

      <SignInForm onSubmit={handleSubmit}>
        <SignInInput
          type='email'
          placeholder='Email'
          id='email'
          value={formFields.email}
          onChange={handleChange}
        />
        <SignInInput
          type='password'
          placeholder='Password'
          id='password'
          value={formFields.password}
          onChange={handleChange}
        />
        <SignInButton type='submit'>
          {loading ? "Please Wait..." : "Sign In"}
        </SignInButton>

        <SignInButton type='button' $google>
          <OAuth />
        </SignInButton>
      </SignInForm>

      <SignUpSection>
        <p>Don&#39;t have an account?</p>
        <SignUpLink href='/signup'>Sign Up</SignUpLink>
      </SignUpSection>
      {error && <p className='text-center text-red-500'>{error}</p>}
    </SignInContainer>
  );
};

export default SignIn;
