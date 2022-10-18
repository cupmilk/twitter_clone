import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "components/LeftBar.module.css";

const LeftBar = () => {
  const [checkMenu, setCheckMenu] = useState(false);
  const [menuClicked, setMenuClicked] = useState("styles.left_bar_ul_link_div");

  const rightBarClick = () => {
    //1. 클릭하면 색깔 변화
    //2. 브라우저의 다른곳을 클릭하면 굵기만 남게
    //3. 새로운곳에서 클릭되면 그곳으로 실행

    if (checkMenu) {
      setMenuClicked(
        `${styles.left_bar_ul_link_div} ${styles.left_bar_ul_link_click}`
      );
      setCheckMenu((prev) => !prev);
    } else {
      setMenuClicked(`${styles.left_bar_ul_link_div}`);
      setCheckMenu((prev) => !prev);
    }
  };
  return (
    <div>
      <section className={styles.left_bar_container}>
        <Link className={styles.left_bar_link} to="/">
          <FontAwesomeIcon className={styles.twitter_logo} icon={faTwitter} />
        </Link>
        <ul className={styles.left_bar_ul}>
          <li className={styles.left_bar_ul_link_li}>
            <Link>
              <div onClick={rightBarClick} className={menuClicked}>
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
              <div onClick={rightBarClick} className={menuClicked}>
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
