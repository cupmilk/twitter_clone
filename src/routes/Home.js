import Nweet from "components/Nweet";
import { collection, onSnapshot } from "firebase/firestore";
import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";
import MessageFactory from "components/MessageFactory";
import styles from "routes/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Home = (props) => {
  const { userInf } = props;

  const [messages, setMessages] = useState([]);

  const clickEffect = () => {};

  useEffect(() => {
    // getMessages();
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(nweetsArray);
    });
  }, []);

  // console.log(messages);
  return (
    // <div className="home" style={styles.Home}>
    <div className={styles.home_container}>
      <section className={styles.left_bar_container}>
        <Link className={styles.left_bar_link} to="/">
          <FontAwesomeIcon className={styles.twitter_logo} icon={faTwitter} />
        </Link>
        <ul className={styles.left_bar_ul}>
          <li className={styles.left_bar_ul_li}>
            <div className={styles.left_bar_ul_link}>
              <Link onClick={clickEffect}>
                <FontAwesomeIcon
                  className={styles.left_bar_ul_icons}
                  icon={faHashtag}
                />
                <span className={styles.left_bar_ul_span}>탐색하기</span>
              </Link>
            </div>
          </li>
          <li className={styles.left_bar_ul_li}>
            <div>
              <Link>
                <FontAwesomeIcon
                  className={styles.left_bar_ul_icons}
                  icon={faGear}
                />
                <sapn className={styles.left_bar_ul_span}>설정</sapn>
              </Link>
            </div>
          </li>
          <li className={styles.left_bar_ul_li}>
            <Link className="toProfile" to="/profile">
              <FontAwesomeIcon
                className={styles.left_bar_ul_icons}
                icon={faUser}
              />
              {/* {userInf.displayName ? userInf.displayName : userInf.email}의
              Profile */}
              <span className={styles.left_bar_ul_span}>프로필</span>
            </Link>
          </li>
        </ul>
      </section>

      <MessageFactory userInf={userInf} />
      <div className="Nweet_messages">
        {messages.map((nweet) => (
          <Nweet
            key={nweet.id}
            messageObj={nweet}
            //글쓴이와 현재접속자의 id비교하여 검증
            isOwner={nweet.creatorId === userInf.uid}
          />
        ))}
      </div>

      <div className={styles.right_bar_container}></div>
    </div>
  );
};

export default Home;
