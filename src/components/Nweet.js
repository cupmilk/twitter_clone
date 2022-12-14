import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, { useEffect, useState } from "react";
import styles from "components/Nweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Nweet = (props) => {
  const { messageObj, isOwner, userInf } = props;
  //편집상태 파악
  const [edit, setEdit] = useState(false);
  //편집할때의 input값
  const [newText, setNewText] = useState(messageObj.text);
  const [profileURL, setProfileURL] = useState("");
  const MESSAGE_OBJ = doc(dbService, `nweets/${messageObj.id}`);
  const BASIC_PROFILE_IMG =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const handleDelete = async () => {
    const sure = window.confirm("메세지를 삭제하시겠습니까?");
    if (sure) {
      //firestore의 collection - doc 부분 삭제
      await deleteDoc(MESSAGE_OBJ);
      //파일유무확인
      //파일이 존재하는지 확인을 안하면 firestore에서 없는걸 없애야하기 때문에 오류 발생
      if (messageObj.downloadFileUrl !== "") {
        await deleteObject(ref(storageService, messageObj.downloadFileUrl));
      }
      //storage의 파일의 이름이 messageObj.downloadFileUrl에 해당하는 거 삭제
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewText(value);
  };

  //메세지 업데이트 , edit상태 변화
  const editSubmit = (e) => {
    e.preventDefault();
    updateDoc(MESSAGE_OBJ, {
      text: newText,
    });
    setEdit(false);
  };

  const toggleEditing = () => {
    setEdit((prev) => !prev);
  };
  useEffect(() => {
    if (messageObj.creatorPorfile === "") {
      setProfileURL(BASIC_PROFILE_IMG);
    } else {
      setProfileURL(messageObj.creatorPorfile);
    }
  }, []);

  console.log(messageObj.creatorPorfile);
  return (
    <div className={styles.Nweet}>
      <div className={styles.profile_contianer}>
        <img
          className={styles.profile_img}
          src={profileURL}
          alt=""
          width="50px"
          height="50px"
        />
      </div>
      <div>
        <span> {messageObj.creatorName}</span>
        {edit ? (
          <div className={styles.message_container}>
            {isOwner && (
              <>
                <form onSubmit={editSubmit}>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={newText}
                    required
                  />
                  <button type="submit" value="update">
                    edit
                  </button>
                  <button>cancle</button>
                </form>
              </>
            )}
          </div>
        ) : (
          <div className={styles.message_container}>
            <h4>{messageObj.text}</h4>
            {messageObj.downloadFileUrl && (
              <img
                src={messageObj.downloadFileUrl}
                alt=""
                width="50px"
                height="50px"
              />
            )}

            {isOwner && (
              //우클릭해서 에딧하는걸할수있도록 바꾸기
              <>
                <button onClick={handleDelete}>delete</button>
                <button onClick={toggleEditing}>Edit</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nweet;
