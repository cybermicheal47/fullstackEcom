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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Productpage />} />
      <Route path="/cart" element={<Cartpage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
