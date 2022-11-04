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
import styles from "routes/Auth.module.css";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
  };

  return (
    <div className={styles.container}>
      <div className={styles.auth_img_box}>
        <FontAwesomeIcon className={styles.auth_img_icon} icon={faTwitter} />
      </div>
      <div className={styles.auth_item_container}>
        <FontAwesomeIcon className={styles.auth_items_logo} icon={faTwitter} />
        <div className={styles.auth_items_copy}>
          <span>지금일어나고 있는 일</span>
        </div>
        <div className={styles.auth_items_info}>
          <span>Nwitter 로그인하기</span>
        </div>
        <div className={styles.auth_form_container}>
          <AuthForm />
          <div className={styles.auth_log_Btn_container}>
            <button
              className={styles.auth_log_Btn}
              name="google"
              onClick={onSocialClick}
            >
              <FontAwesomeIcon className={styles.brand_logo} icon={faGoogle} />{" "}
              계정으로 로그인
            </button>
            <button
              className={styles.auth_log_Btn}
              name="github"
              onClick={onSocialClick}
            >
              <FontAwesomeIcon className={styles.brand_logo} icon={faGithub} />{" "}
              계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
