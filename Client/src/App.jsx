import { Routes, Route, Navigate } from "react-router-dom";
import CheckAuth from "./components/Common/checkAuth";
import AuthLayout from "./components/Auth/authLayout";
import AuthLogin from "./pages/authLogin";
import AuthRegister from "./pages/authRegister";
import AdminLayout from "./components/AdminComponent/AdminLayout";
import Dashboard from "./pages/AdminPage/Dashboard";
import Orders from "./pages/AdminPage/Orders";
import Product from "./pages/AdminPage/Product";
import ShoppingLayout from "./components/ShoppingComponent/ShoppingLayout";
import Account from "./pages/ShoppingView/Account";
import ProductList from "./pages/ShoppingView/ProductList";
import Checkout from "./pages/ShoppingView/Checkout";
import NotFound from "./pages/NotFound";
import Home from "./pages/ShoppingView/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckAuthenticationAccess } from "./ReduxToolkit/slices/authSlice";
import { Loader2Icon } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(CheckAuthenticationAccess());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden select-none">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Product />} />
        </Route>

        <Route
          path="/shopping"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/" element={<Navigate to="/shopping/home" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
