import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "myFirebase";
import React, { useEffect, useState } from "react";
import styles from "components/AuthForm.module.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (!account) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const showErrorMessage = () => {
    switch (error) {
      case "":
        return setErrorMessage("");
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return setErrorMessage("비밀번호는 최소 6자리 이상이여야합니다.");
      case "Firebase: Error (auth/email-already-in-use).":
        return setErrorMessage("이미 가입된 메일입니다.");
      case "Firebase: Error (auth/invalid-email).":
        return setErrorMessage("잘못된 이메일 형식입니다.");
      case "Firebase: Error (auth/wrong-password).":
        return setErrorMessage("잘못된 비밀번호입니다. 다시 입력하십시오");
      case "Firebase: Error (auth/user-not-found).":
        return setErrorMessage("잘못된 이메일입니다. 다시 입력하십시오");
      default:
        return setErrorMessage(
          "오류가 발생했습니다, 다시 실행해 주시기바랍니다"
        );
    }
  };

  useEffect(() => {
    showErrorMessage();
  }, [error]);

  const toggleAccount = () => {
    setAccount((prev) => !prev);
  };
  return (
    <>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          className={styles.form_input}
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.form_input}
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input_submit}
          type="submit"
          value={account ? "login" : "create"}
          // onClick={showErrorMessage}
        />
        {/* <p className="error_message"> {error}</p> */}
        {/* <p className="error_message"> {errorMessage[1]}</p> */}

        <p className={styles.form_p}> {errorMessage}</p>
        <div className={styles.form_span_container}>
          <span>
            {account ? "아직 계정이 없으신가요?" : "기존 계정이 있으신가요? "}
          </span>
          <span className={styles.auth_authSwitch} onClick={toggleAccount}>
            {account ? "가입" : "로그인"}
          </span>
          <span>하기</span>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
