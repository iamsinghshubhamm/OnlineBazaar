import { logoutUser } from "@/ReduxToolkit/slices/authSlice";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Update this import path based on your project

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  // Handle Logout Function
  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)} className="lg:hidden sm:block ">
        <GiHamburgerMenu />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-gray-800 text-white">
              <IoMdLogOut />
              Logout
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will log you out of your session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}

export default AdminHeader;
