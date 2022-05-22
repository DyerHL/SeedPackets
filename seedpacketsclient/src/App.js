import { useEffect } from "react";
import FrostDateField from "./Components/FrostDateField";
import { auth } from "./Data/APIKeys";
import { userExisitsinDB } from "./Data/Auth";
import Routing from "./Routes";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authed) => {
      if(authed) {
        const userInfoObj = {
          Name: authed.displayName,
          Uid: authed.uid,
          accessToken: authed.accessToken,
        };
        sessionStorage.setItem("token", authed.accessToken);
        sessionStorage.setItem("uid", authen.uid);
        userExisitsinDB(authed.accessToken).then(setUser(userInfoObj))
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        {user ? (
        <>
          <Nabar user={user} />
          <Routing user={user} />
        </>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
}

export default App;
