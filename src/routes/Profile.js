import { collection, query, where } from "firebase/firestore";
import { authService, dbService } from "myFirebase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { userInf } = props;
  //useHistory -> useNavigate로 변경
  const LogOutHistory = useNavigate();

  const handleLogOut = () => {
    authService.signOut();
    LogOutHistory("/");
  };
  const getMyMessages = async () => {
    const myMessages = await collection(dbService, "nweets");
    query(myMessages, where("creatorId", "==", userInf.uid));

    console.log();
  };

  useEffect(() => {
    getMyMessages();
  }, []);
  return (
    <>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
};

export default Profile;
