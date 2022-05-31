import { Link } from "react-router-dom";
import { getFrostDateById } from "../Data/FrostDate";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";


export default function SeedPacketCard ({ card, user }) {
    const [sow, setSow] = useState(null);
    const [object, setObject] = useState({})

    useEffect(() => {
        getFrostDateById(user.frostDateId).then(setObject);
        const frostDate = new Date(object.averageFrostDate);
        const daysBeforeFrost = -((card.weeksBeforeFrost) * 7);
        const sowDate = new Date(frostDate.setDate(frostDate.getDate() + daysBeforeFrost));
        const sowDateText = sowDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric'});
        setSow(sowDateText);
    })
    
    return (
        <>
        <div className="seed-card">
            <div>{card.name}</div>
            <div>
                <img src={card.imgUrl} />
            </div>
            <div>Sow: {sow}</div>
            <Link to={`/details/${card.id}`} type='button'>Plant Details</Link>
        </div>
        </>
    )
}

SeedPacketCard.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired,
    card: PropTypes.shape(PropTypes.obj).isRequired
};

