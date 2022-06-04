import React, { useEffect, useState } from "react";
import { auth } from "./Data/APIKeys";
import { userExisitsinDB } from "./Data/Auth";
import Routing from "./Routes";
import SignIn from "./Views/LoggedOut";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

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
      <div className="app">
        {user ? (
        <>
          <Navbar user={user} />
          <Routing user={user} />
          <Footer />
        </>
        ) : (
          <SignIn />
        )}
      </div>
  );
}

export default App;
