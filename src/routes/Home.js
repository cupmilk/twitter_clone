import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, { useEffect, useState } from "react";

const Home = (props) => {
  const { userInf } = props;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  //오래된 방식
  // const getMessages = async () => {
  //   const dbMessages = await getDocs(collection(dbService, "nweets"));
  //   //  firebase의 cloud_firstore의 컬렉션:nweets에서 저장된 목록을 가져오는것
  //   dbMessages.forEach((doc) => {
  //     const messageObject = {
  //       id: doc.id,

  //       ...doc.data(),
  //     };
  //     setMessages((prev) => [messageObject, ...prev]);
  //   });
  // };

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="what's on your mind"
          maxLength="120"
        />
        <input type="file" accept="image/*" onChange={handleFile} />

        <input type="submit" value="send" />
        {fileUrl && (
          <div>
            <img src={fileUrl} alt="" width="50px" height="50px" />
            <button onClick={handleClearfile}>clear</button>
          </div>
        )}
      </form>
      <div>
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
  );
};

export default Home;
