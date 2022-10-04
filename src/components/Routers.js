import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const Routers = (props) => {
  const { isLogIn, userInf, refreshUser } = props;
  return (
    <Router>
      {isLogIn && <Navigation userInf={userInf} />}

      <Routes>
        {isLogIn ? (
          <>
            <Route path="/" element={<Home userInf={userInf} />} />
            <Route
              path="/profile"
              element={<Profile userInf={userInf} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
