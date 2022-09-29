import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Routers = (props) => {
  const { isLogIn } = props;
  return (
    <Router>
      <Routes>
        {isLogIn ? (
          <Route exact path="/" element={<Home />} />
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
