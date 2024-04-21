import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
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
