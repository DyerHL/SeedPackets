import { Link } from "react-router-dom";
import { getFrostDateById } from "../Data/FrostDate";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { updatedPlantedDate } from "../Data/SeedPackets";


export default function SeedPacketCard ({ card, user }) {
    const [sow, setSow] = useState(null);
    const [usersFrostDate, setUsersFrostDate] = useState({});
    const [plantedDate, setPlantedDate] = useState(card.plantingDate);
    const [harvestDateText, setHarvestDateText] = useState(card.plantingDate);
    
    useEffect(() => {
        getFrostDateById(user.frostDateId).then(setUsersFrostDate);
    }, []);
    
    useEffect(() => {
            const frostDate = new Date(usersFrostDate.averageFrostDate);
            const daysBeforeFrost = -((card.weeksBeforeFrost) * 7);
            const sowDate = new Date(frostDate.setDate(frostDate.getDate() + daysBeforeFrost));
            const sowDateText = sowDate.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric'});
            setSow(sowDateText)
    }, [usersFrostDate]);
    
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if(plantedDate != "0001-01-01T00:00:00") {
                const planted = new Date(plantedDate);
                const daysToMaturity = card.harvestDays;
                const harvest = new Date(planted.setDate(planted.getDate() + daysToMaturity));
                const harvestDateText = harvest.toLocaleString('default', {weekday: 'long', month: 'long', day: 'numeric'});
                setHarvestDateText(harvestDateText);
            };
        }
        return () => {
            isMounted = false;
        }
    }, [plantedDate]);
    
    async function handlePlantedAction() {
            const updatedObject = await updatedPlantedDate(card.id); 
            setPlantedDate(updatedObject.plantingDate);
    };

    return (
        <>
        <div className="seed-card">
            <div className="title">{card.name}</div>
            <img className="img-holder" src={card.imgUrl} />
            <div className="sow"><strong>Sow:</strong> {sow}</div>
            <div>
                {(harvestDateText != "0001-01-01T00:00:00") ? (
                    <div className="harvest-date">Harvest Date: {harvestDateText}</div>
                ) : (
                    <button onClick={handlePlantedAction} className="planted-button"><span>Planted</span></button>
                )}
            </div>   
            <div><Link to={`/details/${card.id}`} type='button' className="card-button"><span>Plant Details</span></Link></div>
        </div>
        </>
    )
}

SeedPacketCard.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired,
    card: PropTypes.shape(PropTypes.obj).isRequired, 
};

