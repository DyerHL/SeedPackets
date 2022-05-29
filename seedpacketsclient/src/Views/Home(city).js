import { useState, useEffect } from "react";
import SeedPacketCard from "../Components/SeedPacketCard";
import { getSeedPacketsByUid } from "../Data/SeedPackets";
import PropTypes from 'prop-types';

export default function HomeCity({ user }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
      getSeedPacketsByUid(user.uid).then(setCards);
    }, []);

    return (
        <> 
        {cards ? (
            <div>
                <h1>Home</h1>
                <div className="cards">
                    {cards.map((card) => (
                        <SeedPacketCard user={user} key={card.id} setCards={setCards} card={card} />
                    ))}
                </div>
            </div>
            ) : (
              <h1>Add your city to get your frost date, then start adding your seed packets!</h1>
            )}
        </>
    )
}

HomeCity.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};
