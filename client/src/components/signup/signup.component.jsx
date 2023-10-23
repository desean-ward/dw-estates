"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { signinSuccess } from "@/redux/features/user/userSlice";

import {
  SignUpButton,
  SignUpContainer,
  SignUpForm,
  SignUpInput,
  SignInLink,
  SignInSection,
} from "./signup.styles";
import OAuth from "../oauth/oauth.component";

const SignUp = () => {
  const defaultFormFields = {
    username: "",
    email: "",
    password: "",
    avatar: "/images/avatar-placeholder.jpg",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormFields({ ...formFields, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    error && setError(null);

    try {
      const res = await fetch(`${URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      const data = await res.json();

      // If the user is not created successfully, display the error message
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      // If the user is created successfully, redirect to the login page
      setLoading(false);
      setError(null);
      dispatch(signinSuccess(data));
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }

    setFormFields(defaultFormFields);
  };

  return (
    <SignUpContainer>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>

      <SignUpForm onSubmit={handleSubmit}>
        <SignUpInput
          type='text'
          placeholder='User Name'
          id='username'
          value={formFields.username}
          onChange={handleChange}
        />
        <SignUpInput
          type='email'
          placeholder='Email'
          id='email'
          value={formFields.email}
          onChange={handleChange}
        />
        <SignUpInput
          type='password'
          placeholder='Password'
          id='password'
          value={formFields.password}
          onChange={handleChange}
        />
        <SignUpButton type='submit'>
          {loading ? "Please Wait..." : "Sign Up"}
        </SignUpButton>

        <SignUpButton type='button' $google>
          <OAuth />
        </SignUpButton>
      </SignUpForm>

      <SignInSection>
        <p>Already have an account?</p>
        <SignInLink href='/signin'>Sign In</SignInLink>
      </SignInSection>
      {error && <p className='text-center text-red-500'>{error}</p>}
    </SignUpContainer>
  );
};

export default SignUp;
