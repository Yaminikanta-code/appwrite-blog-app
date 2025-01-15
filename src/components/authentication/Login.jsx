import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "../index";
import { authService } from "../../appwrite";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full sm:w-2/3 lg:w-[28%] sm:h-auto bg-white rounded-lg sm:shadow-lg p-8 mb-10">
      {" "}
      <div className=" mx-auto mb-6 flex items-center justify-center">
        <Logo width="100%" />
      </div>
      <h1 className="text-2xl font-title text-neutral-950 mb-6">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
        {" "}
        {/* handleSubmit from react-hook-form */}
        <Input
          lable="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          lable="Password"
          placeholder="Enter your password"
          type="password"
          {...register("password", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                  value
                ) || "Password must be valid",
            },
          })}
        />
        {error && (
          <p className="text-sm text-red-500 text-center mt-4">{error}</p>
        )}
        <Button type="submit" className="hover:bg-[#4f0edf]">
          Sign In
        </Button>
      </form>
      <p className="text-sm text-neutral-950 text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#611BF8] underline cursor-pointer">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
