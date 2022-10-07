import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "css/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <App />
  </div>
);
