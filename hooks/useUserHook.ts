"use client";

import { FormData, LogInAPIReturn, LogInData, SessionDetails } from "@/types";
import { setUserCredentials } from "@/utils";
import { API } from "@/api";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const initialState: FormData = {
  email: "",
  password: "",
  userName: "",
  confirmPassword: "",
};

const useUserHook = () => {
  const [formState, setFormState] = useState(initialState);
  const [signUpState, setSignUpState] = useState(false);

  //if error occurs then move the three variables below to inside handleLogin function
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryUrl = (searchParams.get("callbackUrl") as string) ?? "/home";
  const callbackUrl =
    queryUrl !== "/home"
      ? `/session/${searchParams.get("callbackUrl")}`
      : queryUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(callbackUrl);

    const output: LogInAPIReturn = await API.login({
      email: formState.email,
      password: formState.password,
    });
    if (output.message === "Logged in successfully") {
      const { message: _, ...userCredentials } = output;
      setUserCredentials(userCredentials);
      toast.success(output.message);

      //TODO: subscribe to session websocket
      router.push(callbackUrl);
    } else {
      const error = output.data ? output.data.join(" \u26D4 ") : output.message;
      toast.error(error);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const output: { message: string; data?: string[] } = await API.signup({
      userName: formState.userName,
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
    });
    if (output.message === "user created") {
      toast.success("New user signed up");
      setFormState(initialState);
      toggleSignUpState();
    } else {
      toast.error(output.data?.join(" \u26D4 "));
    }
  };

  const toggleSignUpState = () => {
    setSignUpState((previousState) => !previousState);
  };

  return {
    signUpState,
    handleLogIn,
    handleSignUp,
    handleChange,
    toggleSignUpState,
    formState,
  };
};

export default useUserHook;
