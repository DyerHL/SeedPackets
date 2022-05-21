import CreateSeedPacket from "./Views/CreateSeedPacket";
import EditSeedPacket from "./Views/EditSeedPacket";
import Homecity from "./Views/Home(city)";
import HomeNoCity from "./Views/Home(nocity)";
import SeedPacketDetails from "./Views/SeedPacketDetails";

function App() {
  return (
    <>
     <HomeNoCity />
    </> 
  );
}

export default App;

    // <div className="App">
    //   {user ? (
    //   <>
    //     <Nabar />
    //     <Routing />
    //   </>
    //   ) : (
    //     <SignIn />
    //   )}
    // </div>