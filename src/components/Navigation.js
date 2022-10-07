import React from "react";
import { Link } from "react-router-dom";
import "css/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  const { userInf } = props;

  return (
    <div className="Navigation">
      <nav>
        <ul className="nav_menu">
          <li>
            <Link className="toHome" to="/">
              <FontAwesomeIcon className="twitter_logo" icon={faTwitter} />
            </Link>
          </li>
          <li>
            <Link className="toProfile" to="/profile">
              <FontAwesomeIcon className="icon_profile" icon={faUser} />
              {/* {userInf.displayName ? userInf.displayName : userInf.email}의
              Profile */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
