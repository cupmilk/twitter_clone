import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "myFirebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { userInf, refreshUser } = props;

  const [displayName, setDisplayName] = useState(userInf.displayName);

  //useHistory -> useNavigate로 변경
  const LogOutHistory = useNavigate();

  const handleLogOut = () => {
    authService.signOut();
    LogOutHistory("/");
  };

  //prifile 메세지 내역확인
  const getMyMessages = async () => {
    const myMessages = collection(dbService, "nweets");
    const q = query(
      myMessages,
      where("creatorId", "==", userInf.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log(doc.data()));
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
    </>
  );
};

export default Profile;
