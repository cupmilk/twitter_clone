import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";

const Nweet = (props) => {
  const { messageObj, isOwner } = props;
  //편집상태 파악
  const [edit, setEit] = useState(false);
  //편집할때의 input값
  const [newText, setNewText] = useState(messageObj.text);

  const MESSAGE_OBJ = doc(dbService, `nweets/${messageObj.id}`);

  const handleDelete = async () => {
    const sure = window.confirm("메세지를 삭제하시겠습니까?");
    if (sure) {
      //firestore의 collection - doc 부분 삭제
      await deleteDoc(MESSAGE_OBJ);
      //storage의 파일의 이름이 messageObj.downloadFileUrl에 해당하는 거 삭제
      await deleteObject(ref(storageService, messageObj.downloadFileUrl));
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
    console.log(newText, messageObj);
    updateDoc(MESSAGE_OBJ, {
      text: newText,
    });
    setEit(false);
  };

  const toggleEditing = () => {
    setEit((prev) => !prev);
  };

  console.dir(messageObj);
  return (
    <div>
      {edit ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Nweet;
