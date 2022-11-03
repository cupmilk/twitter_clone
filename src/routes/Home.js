import Nweet from "components/Nweet";
import { collection, onSnapshot } from "firebase/firestore";
import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";
import MessageFactory from "components/MessageFactory";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import styles from "routes/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (props) => {
  const { userInf } = props;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // getMessages();
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(nweetsArray);
    });
  }, []);

  console.log(messages);
  return (
    // <div className="home" style={styles.Home}>
    <div className={styles.home_container}>
      <div className={styles.Message_Container}>
        <div className={styles.Main_category}>
          <h1>Home</h1>
          <FontAwesomeIcon icon={faStar} />
        </div>
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
      </div>

      <div className={styles.right_bar_container}>something</div>
    </div>
  );
};

export default Home;
