import { Route, Routes } from "react-router";
import CreateSeedPacket from "../Views/CreateSeedPacket";
import EditSeedPacket from "../Views/EditSeedPacket";
import HomeCity from "../Views/Home(city)";
import HomeNoCity from "../Views/Home(nocity)";
import SeedPacketDetails from "../Views/SeedPacketDetails";

export default function Routing() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeCity />} />
                <Route path="/edit" element={<EditSeedPacket />} />
                <Route path="/create" element={<CreateSeedPacket />} />
                <Route path="/no-frost-date" element={<HomeNoCity />} />
                <Route path="/details/:key" element={<SeedPacketDetails />} />
            </Routes>
        </>
    )
}