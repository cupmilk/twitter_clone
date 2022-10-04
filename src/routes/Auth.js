import { authService } from "myFirebase";
import React from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import AuthForm from "components/AuthForm";

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
    <div>
      <AuthForm />
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
