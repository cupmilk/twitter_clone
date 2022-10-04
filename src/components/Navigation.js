import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const { userInf } = props;

  console.log(userInf);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">
              {userInf.displayName ? userInf.displayName : userInf.email}의
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
