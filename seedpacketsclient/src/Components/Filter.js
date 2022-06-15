import React, { useEffect } from 'react';
import bootstrap from 'bootstrap';
import data from 'bootstrap/js/src/dom/data';
import PropTypes from 'prop-types';
import { getAlphabeticalSeedPackets } from '../Data/SeedPackets';

export default function Filter({ func, data, sortedCards, user}) {
    //const alphabetical = data.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    //const alphabetical = data.sort((a,b) => a.name.localeCompare(b.name));
    const planted = data.sort((a, b) => (b.plantingDate > a.plantingDate) ? 1 : -1);
    const notPlanted = (data.sort((a, b) => (a.plantingDate > b.plantingDate) ? 1 : -1));

    const handleClick = (e) => {
        if (e.target.value == "alphabetical") {
            getAlphabeticalSeedPackets(user.uid).then(func);
            console.log(getAlphabeticalSeedPackets)
        } else if (e.target.value == 'planted') {
            func(planted)
            console.log('planted fired');
        } else {
            func(notPlanted);
            console.log(notPlanted);
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
                    {/* <li><button value="planted" onClick={handleClick} className="dropdown-item" >{`Planted -> Not Planted`}</button></li>
                    <li><button value="not" onClick={handleClick} className="dropdown-item" >{`Not Planted -> Planted`}</button></li> */}
                    <li><button value="alphabetical" onClick={handleClick} className="dropdown-item">Alphabetical</button></li>
                </ul>
            </div>
        </div>
    )
}

Filter.propTypes = {
    data: PropTypes.array,
    func: PropTypes.func,
    user: PropTypes.shape(PropTypes.obj).isRequired
};

// TEST FOR FILTER
// const data = [
//     { name: "beets",
//       plantingDate:"0001-01-01T00:00:00"
//     },
//     { name: "artichoke",
//       plantingDate: "0001-01-01T00:00:00"
//     },
//     { name: "peppers",
//       plantingDate: "2022-06-07T00:00:00"
//     },
//     { name: "watermelon",
//       plantingDate:"2022-06-07T00:00:00"
//     },
//   ]
//    const alphabetical = data.sort((a, b) => (a.name > b.name) ? 1 : -1); 

