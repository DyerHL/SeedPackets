import { useState, useEffect } from "react";
import SeedPacketCard from "../Components/SeedPacketCard";
import { getSeedPacketsByUid } from "../Data/SeedPackets";
import PropTypes from 'prop-types';
import { getFrostDateById } from "../Data/FrostDate";
import { getUserByUid } from "../Data/Auth";

export default function HomeCity({ user }) {
    const [cards, setCards] = useState([]);
    const [newUser, setNewUser] = useState({});

    useEffect(() => {
        getUserByUid(user.uid).then(setNewUser);
    }, [])

    useEffect(() => {
        getSeedPacketsByUid(newUser.uid).then(setCards);
    }, [newUser])

    return (
        <> 
        {(cards != null) ? (
            <div className="cards-container">
                <div className="cards">
                    {cards.map((card) => (
                        <SeedPacketCard user={newUser} key={card.id} setCards={setCards} card={card} />
                    ))}
                </div>
            </div>
            ) : (
              <div className="start-message">Add your city to get your frost date, then start adding your seed packets!</div>
            )}
        </>
    )
}

HomeCity.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};
