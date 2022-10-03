import { authService, firebaseInstance } from "myFirebase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { async } from "@firebase/util";

const Auth = () => {
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
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      console.log(name);
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      console.log(name);
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input type="submit" value={account ? "login" : "create"} />
      </form>
      <p> {errorMessage[1]}</p>
      <span onClick={toggleAccount}>
        {account ? "create Account" : "sign in"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Git hub
        </button>
      </div>
    </div>
  );
};

export default Auth;
