import { useEffect, useState } from "react";
import Routers from "components/Routers";
import { authService } from "myFirebase";
import { updateCurrentUser } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); //firebase가 초기화되도록 유지
  const [userInf, setUserInf] = useState(null);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserInf(authService.currentUser);
  };

  useEffect(() => {
    // firebase가 실행되기전에 app이 실행되는거 방지
    // onAuthStateChanged : 유저 sigin-in 변화시 상태 알려줌 -> 로그인이 된건지 안된건지 상태 파악가능
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserInf(user);
      } else {
        setUserInf(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {/* init 초기값 false인 이유 : init의 상태에 따라 router을 통해 보여주는것이 다름  */}
      <div className="app_body">
        {init ? (
          <Routers
            refreshUser={refreshUser}
            isLogIn={Boolean(userInf)}
            userInf={userInf}
          />
        ) : (
          "initailzing.."
        )}
      </div>
    </>
  );
}

export default App;
