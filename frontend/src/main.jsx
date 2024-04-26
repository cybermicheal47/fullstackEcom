import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/styles/index.css";
import AdminRoute from "./components/AdminRoute.jsx";

// import "daisyui/dist/full.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Productpage from "./Pages/Productpage.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Cartpage from "./Pages/Cartpage.jsx";
import Loginpage from "./Pages/Loginpage.jsx";
import Registerpage from "./Pages/Registerpage.jsx";
import ShippingPage from "./Pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import Orderpage from "./Pages/Orderpage.jsx";
import CreateOrder from "./Pages/CreateOrder.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Profilepage from "./Pages/Profilepage.jsx";
import OrderListPage from "./Pages/Adminpages/OrderListPage.jsx";
import ProductListPage from "./Pages/Adminpages/ProductListPage.jsx";
import CreateProduct from "./Pages/Adminpages/CreateProduct.jsx";
import Editproduct from "./Pages/Adminpages/Editproduct.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Productpage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/order/:id" element={<Orderpage />} />
        <Route path="/profile" element={<Profilepage />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/createproduct" element={<CreateProduct />} />
        <Route path="/admin/product/:id/edit" element={<Editproduct />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
