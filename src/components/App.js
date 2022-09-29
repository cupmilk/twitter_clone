import { useState } from "react";
import Routers from "components/Routers";
import { authService } from "myFirebase";

function App() {
  const [isLogIn, setIsLogIn] = useState(authService.currentUser);
  return (
    <>
      <Routers isLogIn={isLogIn} />
      <footer> &copy; clone {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
