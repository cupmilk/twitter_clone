import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
      text: message,
      createdAt: Date.now(),
      creatorId: userInf.uid,
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="add_file"
          className="file_menu"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <label htmlFor="add_file" className="file_meun_lable">
          <FontAwesomeIcon className="file_meun_icon" icon={faPlusSquare} />
        </label>
        <input
          className="message_area"
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="what's on your mind"
          maxLength="120"
        />
        <label htmlFor="message_send">
          <FontAwesomeIcon className="message_send_icon" icon={faPaperPlane} />
        </label>
        <input
          type="submit"
          value="send"
          className="message_send"
          id="message_send"
        />
        {fileUrl && (
          <div>
            <img src={fileUrl} alt="" width="50px" height="50px" />
            <button onClick={handleClearfile}>clear</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageFactory;
