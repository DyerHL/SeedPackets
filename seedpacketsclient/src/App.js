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
        setUser(userInfoObj);
        //const userObj = getUserByUid(userInfoObj.uid);
        //setUser(userObj);
        
        //const userObj = await getUserByUid(userInfoObj.uid);
        // setUser(await userObj);
        
        // async function settingUser(userInfoObj) {
          //   const userObj = await getUserByUid(userInfoObj.uid);
          //   await setUser(userObj);
        // };
        //settingUser(userInfoObj);

      } else {
        setUser(false);
        sessionStorage.clear();
      };
    });

  }, []);
  
  // TEMP USER OBJ
  const tempUserObj = {
    "id": 3,
    "name": "Halie Dyer",
    "uid": "HLCbn7Yw46YiNMw1xWiPQgbVGkj2",
    "city": null,
    "frostDateId": 1291
  }

  return (
      <div>
        {user ? (
        <>
          <Navbar user={tempUserObj} />
          <Routing user={tempUserObj} />
        </>
        ) : (
          <SignIn />
        )}
      </div>
  );
}

export default App;
