import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "components/LeftBar.module.css";

const LeftBar = () => {
  return (
    <div>
      <section className={styles.left_bar_container}>
        <Link className={styles.left_bar_link} to="/">
          <FontAwesomeIcon className={styles.twitter_logo} icon={faTwitter} />
        </Link>
        <ul className={styles.left_bar_ul}>
          <li className={styles.left_bar_ul_link_li}>
            <Link>
              <div className={styles.left_bar_ul_link_div}>
                <FontAwesomeIcon
                  className={styles.left_bar_ul_icons}
                  icon={faHashtag}
                />
                <span className={styles.left_bar_ul_span}>탐색하기</span>
              </div>
            </Link>
          </li>
          <li className={styles.left_bar_ul_li}>
            <Link>
              <div className={styles.left_bar_ul_link_div}>
                <FontAwesomeIcon
                  className={styles.left_bar_ul_icons}
                  icon={faGear}
                />
                <span className={styles.left_bar_ul_span}>설정</span>
              </div>
            </Link>
          </li>

          {/* <li className={styles.left_bar_ul_li}>
            <Link className="toProfile" to="/profile">
              <div>
                <FontAwesomeIcon
                  className={styles.left_bar_ul_icons}
                  icon={faUser}
                />
                <span className={styles.left_bar_ul_span}>프로필</span>
              </div>
            </Link>
          </li> */}
        </ul>
      </section>
    </div>
  );
};

export default LeftBar;
