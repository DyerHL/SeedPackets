import React, { useEffect } from 'react';
import bootstrap from 'bootstrap';
import data from 'bootstrap/js/src/dom/data';
import PropTypes from 'prop-types';
import { getAlphabeticalSeedPackets, getSeedPacketsByPlantedStatus, getSeedPacketsByPlantedStatusReverse } from '../Data/SeedPackets';

export default function Filter({ func, sortedCards, user}) {

    const handleClick = (e) => {
        if (e.target.value == "alphabetical") {
            getAlphabeticalSeedPackets(user.uid).then(func);
        } else if (e.target.value == 'planted') {
            getSeedPacketsByPlantedStatus(user.uid).then(func);
        } else {
            getSeedPacketsByPlantedStatusReverse(user.uid).then(func);
        };
    };

    useEffect(() => {}, [sortedCards]);

    return (
        <div className='filter'>
            <div className="btn-group">
                <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort Seed Packets
                </button>
                <ul className="dropdown-menu">
                    <li><button value="planted" onClick={handleClick} className="dropdown-item" >{`Planted -> Not Planted`}</button></li>
                    <li><button value="not" onClick={handleClick} className="dropdown-item" >{`Not Planted -> Planted`}</button></li>
                    <li><button value="alphabetical" onClick={handleClick} className="dropdown-item">Alphabetical</button></li>
                </ul>
            </div>
        </div>
    )
}

Filter.propTypes = {
    func: PropTypes.func,
    user: PropTypes.shape(PropTypes.obj).isRequired
};
