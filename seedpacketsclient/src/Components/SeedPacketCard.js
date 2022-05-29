import { Link } from "react-router-dom";
import { getFrostDateById } from "../Data/FrostDate";
import PropTypes from 'prop-types';

export default function SeedPacketCard ({ card, user }) {
    const frostId = user.FrostDateId;
    const frostDate = new Date(getFrostDateById(frostId));
    const daysBeforeFrost = -((card.weeksBeforeFrost) * 7);
    const sowDate = new Date(frostDate.setDate(frostDate.getDate() + daysBeforeFrost));
    const dateText = JSON.stringify(sowDate);
    return (
        <>
        <div className="seed-card">
            <div>{card.name}</div>
            <div>{user.frostDateId}</div>
            <div>
                <img src={card.imgUrl} />
            </div>
            <div>{dateText}</div>
            <Link to={`/details/${card.id}`} type='button'>Plant Details</Link>
        </div>
        </>
    )
}

SeedPacketCard.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired,
    card: PropTypes.shape(PropTypes.obj).isRequired
};

