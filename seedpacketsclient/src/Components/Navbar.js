import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/collapse';
import { getFrostDateById, getFrostDateByName } from '../Data/FrostDate';
import { signOutUser, updateUser } from '../Data/Auth';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../Assests/logo-nobg.png';

const initialState = {
    name: '',
};

export default function Navbar({ user }) {
    const [formInput, setFormInput] = useState(initialState);
    const [date, setDate] = useState(null);

    // async function dateToString(date) {
    //     const toJSDate = (date.averageFrostDate).replace('-','/');
    //     const dateToText = await toJSDate.toLocaleDateString('default', {weekday: 'long', month: 'long', day: 'numeric'});
    //     setDate(dateToText);
    //     console.log(date);
    //     console.log(toJSDate);
    // };

    useEffect(() => {
            setFormInput(initialState);
            if(user.frostDateId) {
                getFrostDateById(user.frostDateId).then(setDate);
            };
    }, [date]);
    
    const handleChange = (e) => {
        setFormInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //setFormInput(e.target.value);
        //const searchString = await formInput.name;
        const result = await getFrostDateByName(formInput.name);
        updateUser(result, user.uid).then(setDate(result));
    };


    return(
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className='container-fluid'>
                <Link className="navbar-brand navbar-logo" to="/">
                    <img className="navbar-brand navbar-logo" to="/" alt='logo' style={{ width: '50px' }} src={logo}/>
                </Link>
                <div className='navbar greeting'>Lets Get Planting{user ? (`, ${user.name}!`):('!')}</div>
                {/* Seed Packet Button */}
                {date ? (
                    <Link className="nav-link" to="/create">
                        Add A Seed Packet
                    </Link>
                ) : (
                ""
                )}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav">
                        <li className="nav-item add-packet">
                        </li>    
                        <li className='nav-item frost'>
                            {/* Frost Date Field */}
                            {(date != null) ? (
                                <div className='frost-item'>Your Frost Date: {date.averageFrostDate}</div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">Enter Your City:</label>
                                    <input type="text" id="name" name="name" value={formInput.name} onChange={handleChange}  />
                                    <button type="submit">Submit</button>
                                </form> 
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};
