import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SeedPacketForm from "../Components/SeedPacketForm";
import { getSeedPacketById } from "../Data/SeedPackets";
import PropTypes from 'prop-types';

export default function EditSeedPacket({ user }) {
    const [editItem, setEditItem] = useState({});
    const { key } = useParams();
  
    useEffect(() => {
     getSeedPacketById(key).then(setEditItem);
    }, []);

    return (
        <>
            <div>
                <SeedPacketForm editItem={editItem} user={user} />
            </div>
        </>
    )
};

EditSeedPacket.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};