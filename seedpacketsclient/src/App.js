import React, { useEffect, useState } from "react";
import { auth } from "./Data/APIKeys";
import { getUserByUid, userExisitsinDB } from "./Data/Auth";
import Routing from "./Routes";
import SignIn from "./Views/LoggedOut";
import Navbar from "./Components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authed) => {
      if(authed) {
        const userInfoObj = {
          name: authed.displayName,
          uid: authed.uid,
          accessToken: authed.accessToken
        };
        sessionStorage.setItem("token", authed.accessToken);
        sessionStorage.setItem("uid", authed.uid);
        userExisitsinDB(userInfoObj).then(setUser);
      } else {
        setUser(false);
        sessionStorage.clear();
      };
    });

  }, []);

  return (
      <div>
        {user ? (
        <>
          <Navbar user={user} />
          <Routing user={user} />
        </>
        ) : (
          <SignIn />
        )}
      </div>
  );
}

export default App;
