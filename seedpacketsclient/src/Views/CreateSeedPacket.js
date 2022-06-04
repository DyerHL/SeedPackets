import SeedPacketForm from "../Components/SeedPacketForm";
import PropTypes from 'prop-types';

export default function CreateSeedPacket({ user }) {
    return (
        <>
        <SeedPacketForm user={user} />
        </>
    )
};

CreateSeedPacket.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};