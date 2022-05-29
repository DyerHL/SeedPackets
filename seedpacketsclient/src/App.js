import React, { useEffect, useState } from "react";
import { auth } from "./Data/APIKeys";
import { getUserByUid, userExisitsinDB } from "./Data/Auth";
import Routing from "./Routes";
import SignIn from "./Views/LoggedOut";
import Navbar from "./Components/Navbar";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if(authed) {
        const userInfoObj = {
          name: authed.displayName,
          uid: authed.uid,
          accessToken: authed.accessToken
        };
        sessionStorage.setItem("token", authed.accessToken);
        sessionStorage.setItem("uid", authed.uid);
        
        const userObj = getUserByUid(userInfoObj.uid);
        setUser(userObj);
        
        //const userObj = await getUserByUid(userInfoObj.uid);
        // setUser(await userObj);
        
        // async function settingUser(userInfoObj) {
          //   const userObj = await getUserByUid(userInfoObj.uid);
          //   await setUser(userObj);
        // };
        //settingUser(userInfoObj);

        console.log(user)

      } else {
        setUser(false);
        sessionStorage.clear();
      };
    });

  }, [user]);
  

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
