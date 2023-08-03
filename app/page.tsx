"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import useUserHook from "@/hooks/useUserHook";

const LoginPage = () => {
  const {
    signUpState,
    handleLogIn,
    handleSignUp,
    handleChange,
    toggleSignUpState,
    formState,
  } = useUserHook();

  return (
    <main>
      <div
        className={`w-full h-screen flex justify-center ${
          signUpState
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col md:flex-row"
        }`}
      >
        <div
          className={`w-full h-screen md:w-1/2 ${
            signUpState ? "bg-main-orange" : "bg-main-blue"
          }`}
        ></div>
        <div className="flex flex-col justify-center w-full md:w-1/2 h-screen py-10 px-8 bg-white box-border">
          <form
            onSubmit={signUpState ? handleSignUp : handleLogIn}
            className="flex flex-col items-center gap-y-5 mb-8"
          >
            {signUpState && (
              <InputComponent
                inputName="userName"
                inputType="text"
                inputLabel="username"
                inputPlaceholder="username"
                onChange={handleChange}
                inputValue={formState.userName!}
                styles={{
                  div: "input-component__div--login-signup",
                  label: "input-component__label--login-signup",
                  field: "input-component__field--login-signup",
                }}
              />
            )}
            <InputComponent
              inputName="email"
              inputType="email"
              inputLabel="email"
              inputPlaceholder="email address"
              onChange={handleChange}
              inputValue={formState.email!}
              styles={{
                div: "input-component__div--login-signup",
                label: "input-component__label--login-signup",
                field: "input-component__field--login-signup",
              }}
            />
            <InputComponent
              inputName="password"
              inputType="password"
              inputLabel="password"
              inputPlaceholder="password"
              onChange={handleChange}
              inputValue={formState.password!}
              styles={{
                div: "input-component__div--login-signup",
                label: "input-component__label--login-signup",
                field: "input-component__field--login-signup",
              }}
            />
            {signUpState && (
              <InputComponent
                inputName="confirmPassword"
                inputType="password"
                inputLabel="confirm password"
                inputPlaceholder="confirm password"
                onChange={handleChange}
                inputValue={formState.confirmPassword!}
                styles={{
                  div: "input-component__div--login-signup",
                  label: "input-component__label--login-signup",
                  field: "input-component__field--login-signup",
                }}
              />
            )}
            <ButtonComponent
              colorClass={signUpState ? "bg-main-orange" : "bg-main-blue"}
              hoverColor={
                signUpState ? "hover:bg-hover-orange" : "hover:bg-hover-blue"
              }
              text={signUpState ? "Sign Up" : "Log In"}
            />
          </form>
          <p className="font-normal text-sm text-center tracking-wide text-gray">
            {signUpState
              ? "Already have an account? "
              : "Don't have an account? "}
            <a
              className={`font-semibold tracking-wide no-underline ${
                signUpState ? "text-main-orange" : "text-main-blue"
              }`}
              onClick={toggleSignUpState}
              href="#"
            >
              {signUpState ? "Log In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
