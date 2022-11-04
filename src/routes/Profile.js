import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "myFirebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { userInf, refreshUser } = props;
  const [displayName, setDisplayName] = useState(
    userInf.displayName ? userInf.displayName : userInf.email.split("@")[0]
  );
  const [messageHistory, setMessageHistory] = useState([]);

  //useHistory -> useNavigate로 변경
  const LogOutHistory = useNavigate();

  const handleLogOut = () => {
    authService.signOut();
    LogOutHistory("/");
  };

  //prifile 메세지 내역확인 -> 차후 업데이트
  const getMyMessages = async () => {
    const myMessages = collection(dbService, "nweets");
    const q = query(
      myMessages,
      where("creatorId", "==", userInf.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      setMessageHistory((prev) => [...prev, doc.data().text])
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInf.displayName);
    if (userInf.displayName !== displayName) {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
      });
      refreshUser();
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  useEffect(() => {
    getMyMessages();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          onChange={handleChange}
          placeholder="Display name"
        />
        <input type="submit" value="updte profile" />
      </form>
      <button onClick={handleLogOut}>Log out</button>
      <div>
        <h2> 메세지 내역 </h2>
        {messageHistory.map((message, index) => {
          return <h4 key={index}>{message}</h4>;
        })}
      </div>
    </>
  );
};

export default Profile;
