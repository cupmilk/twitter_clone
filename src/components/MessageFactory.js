import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFaceSmile } from "@fortawesome/free-regular-svg-icons";

import styles from "components/MessageFactory.module.css";

const MessageFactory = (props) => {
  const { userInf } = props;
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let downloadFileUrl = "";

    if (fileUrl !== "") {
      const fileRef = ref(storageService, `${userInf.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, fileUrl, "data_url");
      // console.log(response.ref.getDownloadURL);
      downloadFileUrl = await getDownloadURL(response.ref);

      //nweet messageObj와 같은거 아님
    }
    const messageObj = {
      creatorId: userInf.uid,
      createdAt: Date.now(),
      text: message,

      downloadFileUrl,
    };

    // //collection( firestore , string ) 에서 string은 firebase의 cloud_firstore의 컬렉션의 이름
    // // 아래 코드의 경우 nweets에 {text, createAt}인 객체를 저장
    await addDoc(collection(dbService, "nweets"), messageObj);
    setMessage("");
    setFileUrl("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setMessage(value);
  };

  const handleFile = (e) => {
    const {
      target: { files },
    } = e;
    const inputFile = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileUrl(result);
    };
    fileReader.readAsDataURL(inputFile);
  };

  const handleClearfile = () => {
    setFileUrl(null);
  };

  return (
    <div className={styles.MessageFactory}>
      <form onSubmit={handleSubmit}>
        {/* 라벨로 만들고 display : none 이나 사이즈 0으로 만들어서 */}
        <div>
          <input
            id="add_file"
            className={styles.file_menu}
            type="file"
            accept="image/*"
            onChange={handleFile}
          />

          <input
            className={styles.message_area}
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="what's on your mind"
            maxLength="120"
          />
        </div>
        {fileUrl && (
          <div className={styles.img_preview}>
            <button onClick={handleClearfile} className={styles.clear_button}>
              X
            </button>
            <img
              src={fileUrl}
              alt=""
              width="350px"
              height="210px"
              className={styles.img}
            />
          </div>
        )}
        <div className={styles.tool_bar}>
          <label htmlFor="add_file" className={styles.file_menu_lable}>
            <FontAwesomeIcon className="file_meun_icon" icon={faImage} />
            <FontAwesomeIcon className="file_meun_icon" icon={faFaceSmile} />
          </label>
          <input
            type="submit"
            value="트윗하기"
            className={styles.message_send}
            id="message_send"
          />
        </div>
      </form>
    </div>
  );
};

export default MessageFactory;
