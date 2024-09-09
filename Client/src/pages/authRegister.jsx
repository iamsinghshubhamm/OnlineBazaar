import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/ReduxToolkit/slices/authSlice";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isError = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }
    

    // Dispatch the registerUser action
    dispatch(
      registerUser({
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Account created successfully!",
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message || "Error during registration",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Registration failed",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="container px-0 mx-auto py-0 sm:py-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[22px] md:text-xl font-bold text-gray-900 mb-1">
          Create New Account
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-1">
            <label
              htmlFor="name"
              className="block text-gray-700 text-[15px] sm:text-[16px] font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              className="w-full px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer rounded-lg mb-1"
              required
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block text-gray-700 text-[15px] sm:text-[16px] font-medium mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer rounded-lg mb-1"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-1">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1 text-[15px] sm:text-[16px]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                className="w-full px-3 py-2 border border-gray-200 text-sm outline-none cursor-pointer rounded-lg mb-1"
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1 text-[15px] sm:text-[16px]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                className="w-full px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer rounded-lg mb-1"
                required
              />
            </div>
          </div>
          <div className="mb-1">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-[15px] sm:text-[16px] font-medium mb-1"
            >
              Phone number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
              className="w-full px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer rounded-lg mb-1"
              required
            />
          </div>
          <div>
            <Link to={"/auth/login"}>Already have an account?</Link>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 mt-3 text-white bg-gray-700 rounded-lg mb-1 hover:bg-gray-800 cursor-pointer"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <p className="text-gray-500 mt-4 text-sm">Or continue with</p>
        <div className="flex gap-4 items-center justify-around mt-2">
          <button className="text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-1 font-medium bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 w-full min-w-[130px] justify-center ">
            <FcGoogle />
            Google
          </button>
          <button className="text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-1 font-medium bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 min-w-[130px] w-full justify-center">
            <FaFacebook className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
