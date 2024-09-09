import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { loginUser } from "@/ReduxToolkit/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { fetchCartItems } from "@/ReduxToolkit/slices/cartSlice";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        const userId = data.payload.user.id;
        dispatch(fetchCartItems(userId));
  
        toast({ title: data?.payload?.message });
      } else {
        toast({ title: data?.payload?.message || 'Authentication failed', variant: "destructive" });
      }
    });
  };
  

  return (
    <div className="container px-4 mx-auto py-0 sm:py-4 ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[22px] md:text-xl font-bold text-gray-900 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full px-3 py-2 text-sm border border-gray-200 outline-none rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full px-3 py-2 border border-gray-200 text-sm outline-none rounded-lg"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="remember-me" className="text-gray-700 text-sm">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password">
            <p className="text-blue-600 hover:underline text-[14px] mb-1 cursor-pointer">
              Forgot password?
            </p>
          </Link>
          <button
            type="submit"
            className="w-full px-3 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 text-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle className="animate-spin w-full text-center" /> : " Sign In"}
          </button>
          <div className="w-full text-center text-[15px] mt-2">
            <Link to={"/auth/register"}>Create new account</Link>
          </div>
        </form>
        <p className="text-gray-500 mt-4 text-sm">Or continue with</p>
        <div className="flex gap-4 items-center justify-around mt-2">
          <button className="text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-1 font-semibold bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 w-full min-w-[130px] justify-center">
            <FcGoogle />
            Google
          </button>
          <button className="text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-1 font-semibold bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 min-w-[130px] w-full justify-center">
            <FaFacebook className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
