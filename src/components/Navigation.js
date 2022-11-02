import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "components/Navigation.module.css";

const Navigation = (props) => {
  const { userInf } = props;

  return (
    <div className={styles.Navigation}>
      {/* <LeftBar /> */}
      <div className={styles.twitter_logo_contianer}>
        <nav>
          <Link className={styles.twitter_logo} to="/">
            <FontAwesomeIcon className="twitter_logo" icon={faTwitter} />
          </Link>
        </nav>
      </div>

      <div className={styles.nav_container}>
        <nav>
          <ul className={styles.nav_menu}>
            <li>
              <Link className={styles.link} to="/">
                <div>
                  <box>
                    <FontAwesomeIcon className={styles.icon} icon={faHouse} />
                  </box>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/profile">
                <div>
                  <box>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                  </box>
                  <span>Profile</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
