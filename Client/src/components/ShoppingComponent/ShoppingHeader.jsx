import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/ReduxToolkit/slices/authSlice";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { shoppingHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  fetchCartItems,
  deleteCartItem,
  updateCart,
} from "@/ReduxToolkit/slices/cartSlice";
import UserCartWrapper from "@/pages/ShoppingView/cartWrapper";
import { toast } from "@/hooks/use-toast";

const ShoppingHeader = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart, isLoading } = useSelector((state) => state.cartItem);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDialogOpen(false); // Close dialog after logout
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  // Function to handle product deletion
  const deleteProductHandler = (userId, productId) => {
    dispatch(deleteCartItem({ userId, productId })).then(() => {
      toast({title : 'Cart Deleted Successfully'})

    })
  };

  const updateProductHanlder = (userId, productId, change) => {
    dispatch(updateCart({ userId, productId, quantity: change })).then(() => {
      toast({title : 'Cart Updated Successfully'})
    })
  };
  // Utility function to get initials
  const UserInitials = ({ fullName }) => {
    const getInitials = (fullName = "") => {
      if (!fullName) return "";
      const [firstName, lastName] = fullName.split(" ");
      return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
    };
    return <div>{getInitials(fullName)}</div>;
  };

  // Navigation Menu Items
  const MenuItems = () => (
    <div className="flex flex-col lg:flex-row gap-2">
      {shoppingHeaderMenuItems.map((menuItem) => (
        <Link
          onClick={() => setSidebarOpen(false)}
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm hover:bg-gray-200 py-2 px-6 rounded-lg font-medium hover:text-gray-600 transition"
        >
          {menuItem.label}
        </Link>
      ))}
    </div>
  );

  const HeaderRightItems = () => (
    <div className="flex items-center gap-5 ">
      {/* Cart Icon */}
     { isLoading ? null : <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <SheetTrigger asChild>
          <button
            onClick={() => setOpenCartSheet(true)}
            className="relative text-xl bg-white hover:bg-gray-50 text-gray-800 hover:text-gray-500 transition"
          >
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart?.items?.length || 0}
            </span>
          </button>
        </SheetTrigger>

        <SheetContent className="w-[90%] sm:max-w-md p-2 sm:p-4 select-none">
          <SheetHeader className="text-xl font-semibold">Your Cart</SheetHeader>
          <SheetDescription></SheetDescription>
          <UserCartWrapper
            cartItems={cart}
            user={user}
            deleteProductHandler={deleteProductHandler}
            updateProductHanlder={updateProductHanlder}
          />
         
        </SheetContent>
      </Sheet>}

      {/* User Dropdown */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-gray-700 w-9 h-9 p-1 cursor-pointer">
            <AvatarFallback className="bg-gray-700 text-white font-semibold text-[13px]">
              {user?.userName ? (
                <UserInitials fullName={user.userName} />
              ) : (
                "NA"
              )}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" className="w-48 mr-3">
          <DropdownMenuLabel>{`Hi, ${
            user?.userName || "User"
          }`}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsDropdownOpen(false);
              setIsDialogOpen(true);
            }}
          >
            <div className="cursor-pointer">Logout</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <AlertDialogCancel className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <header className=" bg-white fixed w-full top-0 z-40 text-gray-800  py-3 px-0 sm:py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-serif font-bold hidden lg:block tracking-wider text-gray-700"
        >
          OnlineBazaar
        </Link>

        {/* Sidebar for mobile screens */}
        <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-6 h-6 lg:hidden block cursor-pointer"
            >
              <GiHamburgerMenu />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 md:w-72">
            <SheetHeader className="font-extrabold mb-4 font-serif text-xl">
              OnlineBazaar
            </SheetHeader>
            <SheetDescription>
              <nav>
                <MenuItems />
              </nav>
            </SheetDescription>
          </SheetContent>
        </Sheet>

        {/* Main navigation for larger screens */}
        <nav className="hidden lg:flex">
          <MenuItems />
        </nav>

        {isAuthenticated && <HeaderRightItems />}
      </div>
    </header>
  );
};

export default ShoppingHeader;
