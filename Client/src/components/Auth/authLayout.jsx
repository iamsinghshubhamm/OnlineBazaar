import React from "react";
import { Outlet } from "react-router-dom";
import shoppingcart from "../../assets/shoppingbag.png";

const AuthLayout = () => {
  return (
    <>
    <div
  className="flex min-h-screen items-center w-full py-10 px-2 add-Bg"
>

        <div className="hidden lg:flex items-center justify-center w-1/2 px-12 ">
          <div className="max-w-lg  space-y-6 text-center text-primary-foreground ">
          <h1 className="text-4xl bg-gray-100 pr-3 rounded-lg max-w-xl w-full font-light absolute left-10 text-gray-900 tracking-tight text-end mb-3 ">
              Welcome to OnlineBazar
            </h1>
           
           
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-3 ">
       
          <div className="mx-auto w-full rounded-xl border-gray-20 border max-w-sm px-2 py-3 sm:px-6 sm:py-4">
           
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
