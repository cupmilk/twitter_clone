import { authService } from "myFirebase";
import React from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "css/Auth.css";

const Auth = () => {
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
    <div className="auth">
      <FontAwesomeIcon className="twitter_logo" icon={faTwitter} />
      <AuthForm />
      <div className="log_Btn_div">
        <button className="loginBtn" name="google" onClick={onSocialClick}>
          <FontAwesomeIcon className="google_logo" icon={faGoogle} /> 계정으로
          로그인
        </button>
        <button className="loginBtn" name="github" onClick={onSocialClick}>
          <FontAwesomeIcon className="github_logo" icon={faGithub} /> 계정으로
          로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
