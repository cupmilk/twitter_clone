import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "myFirebase";
import React, { useState } from "react";
import styles from "components/AuthForm.module.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(false);
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

  const errorMessage = error.split(":");

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
        />
        <p className="error_message"> {errorMessage[1]}</p>

        <span className={styles.auth_authSwitch} onClick={toggleAccount}>
          {account ? "create Account" : "sign in"}
        </span>
      </form>
    </>
  );
};

export default AuthForm;
