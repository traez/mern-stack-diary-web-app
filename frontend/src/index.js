import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { PostsContextProvider } from "./context/PostsContext";
import { AuthContextProvider } from "./context/AuthContext";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <Router>
          <App />
        </Router>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
