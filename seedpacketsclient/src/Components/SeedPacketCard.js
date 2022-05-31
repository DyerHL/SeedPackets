import { Link } from "react-router-dom";
import { getFrostDateById } from "../Data/FrostDate";
import PropTypes from 'prop-types';

export default function SeedPacketCard ({ card, user }) {

        // TEMP FROST DATE OBJ
        const tempFrostDateObj = {
            "id": 1291,
            "name": "Adams",
            "averageFrostDate": "2022-05-10T00:00:00"
          };

          const frostDateObj = tempFrostDateObj;
          const frostDate = new Date(frostDateObj.averageFrostDate);
          const daysBeforeFrost = -((card.weeksBeforeFrost) * 7);
          const sowDate = new Date(frostDate.setDate(frostDate.getDate() + daysBeforeFrost));
          const sowDateText = sowDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric'});

    // const frostId = user.FrostDateId;
    // const frostDateObj = getFrostDateById(frostId);
    // const frostDate = new Date(frostDateObj.averageFrostDate);
    // const daysBeforeFrost = -((card.weeksBeforeFrost) * 7);
    // const sowDate = new Date(frostDate.setDate(frostDate.getDate() + daysBeforeFrost));
    // const sowDateText = sowDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric'});
    
    return (
        <>
        <div className="seed-card">
            <div>{card.name}</div>
            <div>
                <img src={card.imgUrl} />
            </div>
            <div>Sow: {sowDateText}</div>
            <Link to={`/details/${card.id}`} type='button'>Plant Details</Link>
        </div>
        </>
    )
}

SeedPacketCard.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired,
    card: PropTypes.shape(PropTypes.obj).isRequired
};

