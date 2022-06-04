import React from "react";
import PropTypes from 'prop-types';
import { Route, Routes } from "react-router-dom";
import CreateSeedPacket from "../Views/CreateSeedPacket";
import EditSeedPacket from "../Views/EditSeedPacket";
import HomeCity from "../Views/Home(city)";
import SeedPacketDetails from "../Views/SeedPacketDetails";

export default function Routing({ user }) {
    return (
        <div className="routes">
            <Routes>
                <Route path="/" element={<HomeCity user={user} />} />
                <Route path="/edit/:key" element={<EditSeedPacket user={user} />} />
                <Route path="/create" element={<CreateSeedPacket user={user} />} />
                <Route path="/details/:key" element={<SeedPacketDetails />} />
            </Routes>
        </div>
    )
};

Routes.propTypes = {
    user: PropTypes.shape(PropTypes.obj)
};
